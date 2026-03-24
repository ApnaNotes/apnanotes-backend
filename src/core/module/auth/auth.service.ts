import { prisma } from '../../../config/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function initUser(
    email: string,
    username: string,
    password: string
) {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    try {
        const user = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
                verificationToken
            }
        });
    } catch (error) {
        console.error({ error });
    }
}
