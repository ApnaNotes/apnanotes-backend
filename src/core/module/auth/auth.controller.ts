import { Request, Response } from 'express';
import { registerInput } from '../../validators/auth.validator';

export async function registerUser(req: Request, res: Response) {
    const dataInput = registerInput.safeParse(req.body); // validates the data coming from frontend
}
