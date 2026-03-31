import { prisma } from '../../../config/prisma';

export async function getUserProfile(id: Number) {
    if (!id) {
        return console.error('Id is required!');
    }
}
