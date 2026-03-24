import { Request, Response } from 'express';
import { registerInput } from '../../validators/auth.validator';
import { initUser } from './auth.service';

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
