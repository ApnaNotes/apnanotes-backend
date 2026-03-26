import { prisma } from '../../../config/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from '../../helpers/services/sendVerificationEmail';
import { Response } from 'express';
import { sendResetPassLinkEmail } from '../../helpers/services/sendPassResetEmail';

export async function initUser(
    email: string,
    username: string,
    name: string,
    password: string
): Promise<{ id: number; email: string; username: string }> {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    try {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                passwordHash,
                verificationToken
            }
        });

        sendVerificationEmail(email, verificationToken).catch((err) => {
            console.error('Failed to send verification email:', err);
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}

export async function retrieveUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        // console.error('User not found');
        return console.error('User not found');
    }

    const decodePass = await bcrypt.compare(password, user.passwordHash);
    if (!decodePass) {
        throw new Error('Invalid Credentials');
    }
    return user;
}

export async function generateResetToken(email: string) {
    const findUserByEmail = await prisma.user.findUnique({
        where: { email }
    });

    if (!findUserByEmail) {
        return console.error('User not found');
    }

    const generateToken = crypto.randomBytes(32).toString('hex');

    try {
        prisma.user.update({
            where: { email },
            data: {
                verificationToken: generateToken,
                passResetTokenExpiry: new Date(Date.now() + 3600000)
            }
        });

        await sendResetPassLinkEmail(email, generateToken).catch((err) => {
            console.error('Failed to send reset pass email:', err);
        });
        return 'Email Sent';
    } catch (error) {
        console.error('Error generating password reset link:', error);
    }
}
