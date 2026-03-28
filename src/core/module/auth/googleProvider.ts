import { Request, Response } from 'express';
import { googleProvider } from '../../../config/google';
import { prisma } from '../../../config/prisma';
import jwt from 'jsonwebtoken';

export async function googleLoginProvider(req: Request, res: Response) {
    const code = req.query.code;
    if (typeof code !== 'string') {
        return res.status(400).json({
            message: 'Valid authorization code is required',
            code: 'INVALID_CODE'
        });
    }

    try {
        const googleResponse = await googleProvider.getToken(code);
        googleProvider.setCredentials(googleResponse.tokens);

        const userResponse = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`
        );
        const userCreds = await userResponse.json();
        const { email, name } = userCreds;

        let user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            let baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            let username = baseUsername;
            let counter = 1;

            while (await prisma.user.findUnique({ where: { username } })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            user = await prisma.user.create({
                data: {
                    email,
                    name,
                    username
                }
            });
        }

        const token = jwt.sign(
            { userId: user.id, userEmail: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'success',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                username: user.username
            }
        });
    } catch (err: any) {
        console.error('LOGIN ERROR:', err);
        return res.status(500).json({
            message: err?.message || 'Internal Server Error',
            code: err?.code || null
        });
    }
}
