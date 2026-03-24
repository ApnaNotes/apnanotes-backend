import { z } from 'zod';

export const registerInput = z.object({
    email: z.string().email('Invalid email format'),
    username: z.string().min(3, 'Invalid username format'),
    password: z.string().min(4, 'Invalid password')
});

export const loginInput = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(4, 'Invalid password')
});
