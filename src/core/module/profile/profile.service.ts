import { prisma } from '../../../config/prisma';

export async function getUserProfile(userid: number) {
    if (!userid) {
        return console.error('Id is required!');
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userid
            },
            include: {
                profile: true
            }
        });
    } catch (err: any) {
        console.error('Error Fetching user profile ');
    }
}
