import { prisma } from '../../../config/prisma';

export async function checkUserVerified(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user?.isVerified || false;
}
