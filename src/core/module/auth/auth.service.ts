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

    if (!user.passwordHash) {
        throw new Error(
            'This account uses Google Sign-In. Please log in with Google.'
        );
    }

    const decodePass = await bcrypt.compare(password, user.passwordHash);
    if (!decodePass) {
        throw new Error('Invalid Credentials');
    }
    return user;
}

export async function generateResetToken(email: string) {
    try {
        const findUserByEmail = await prisma.user.findUnique({
            where: { email }
        });

        if (!findUserByEmail) {
            console.error('User not found');
            return null;
        }

        const generateToken = crypto.randomBytes(32).toString('hex');

        await prisma.user.update({
            where: { email },
            data: {
                passwordResetToken: generateToken,
                passResetTokenExpiry: new Date(Date.now() + 3600000)
            }
        });

        await sendResetPassLinkEmail(email, generateToken);
        return 'Email Sent';
    } catch (error) {
        console.error('Error generating password reset link:', error);
        throw error;
    }
}

export async function resetUserPass(token: string, password: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passResetTokenExpiry: {
                    gt: new Date() // check if token is not expired
                }
            }
        });

        if (!user) {
            throw new Error('Invalid or expired token');
        }

        const hashPass = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: null,
                passResetTokenExpiry: null,
                passwordHash: hashPass
            }
        });

        return {
            success: true,
            message: 'Password reset successfully'
        };
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}
