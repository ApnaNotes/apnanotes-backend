import { Request, Response } from 'express';
import { prisma } from '../../../config/prisma';

/*
 *   incomplete yet
 */
export async function getUserProfile(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: 'User ID is required'
            });
        }

        const userId = Array.isArray(id) ? id[0] : id;

        const numericId = parseInt(userId, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({
                error: 'Invalid user ID format'
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: numericId }
        });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        // call service
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            error: 'Failed to fetch user profile'
        });
    }
}
