import { prisma } from '../../../config/prisma';

export async function initUser(
    email: string,
    username: string,
    password: Number
) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
}
