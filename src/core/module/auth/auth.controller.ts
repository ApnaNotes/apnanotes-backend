import { Request, Response } from 'express';
import { loginInput, registerInput } from '../../validators/auth.validator';
import { initUser, retrieveUser } from './auth.service';
import { checkUserVerified } from '../../helpers/services/isUserVerifiedService';
import jwt from 'jsonwebtoken';
import { prisma } from '../../../config/prisma';
import { sendWelcomeEmail } from '../../helpers/services/sendWelcomeEmail';
import { success } from 'zod';

export async function registerUser(req: Request, res: Response) {
    try {
        const data = registerInput.safeParse(req.body); // validates the data coming from frontend

        if (!data.success) {
            return res.status(400).json({
                error: data.error.issues.map((e) => e.message)
            });
        }

        const { email, name, username, password } = data.data;

        const user = await initUser(email, username, name, password);
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            }
        });
    } catch (err: any) {
        console.error('REGISTER ERROR:', err);

        return res.status(500).json({
            message: err?.message || 'Internal Server Error',
            code: err?.code || null
        });
    }
}

export async function loginUser(req: Request, res: Response) {
    const data = loginInput.safeParse(req.body);

    if (!data.success) {
        return res.status(400).json({
            error: data.error.issues.map((e) => e.message)
        });
    }

    const { email, password } = data.data;
    const user = await retrieveUser(email, password);

    if (!user) {
        return res.status(400).json({
            message: 'Invalid Creds'
        });
    }

    const isUserVerified = await checkUserVerified(email);
    if (!isUserVerified) {
        return res.status(400).json({
            message:
                'Your email is not verified, Look for a verification email in your inbox'
        });
    }

    try {
        const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            process.env.JWT_SECRET!,
            {
                expiresIn: '7d'
            }
        );
        res.json({ token });
    } catch (err: any) {
        console.error('LOGIN ERROR:', err);
        return res.status(500).json({
            message: err?.message || 'Internal Server Error',
            code: err?.code || null
        });
    }
}

export async function verifyUser(req: Request, res: Response) {
    try {
        const { token } = req.body;

        if (!token) {
            return res
                .status(400)
                .json({ error: 'Verification token is required' });
        }

        const user = await prisma.user.findFirst({
            where: { verificationToken: token }
        });

        if (!user) {
            return res
                .status(400)
                .json({ error: 'Invalid verification token' });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: 'Email is already verified' });
        }
        try {
            await sendWelcomeEmail(user?.email);
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
        await prisma.user.update({
            where: { id: user.id },
            data: { isVerified: true, verificationToken: null }
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Verification failed' });
    }
}

export async function resetUserPassword(req: Request, res: Response) {
    const { passwordResetToken } = req.body;

    if (!passwordResetToken) {
        return res.status(400).json({ error: 'Reset token is required' });
    }
}
