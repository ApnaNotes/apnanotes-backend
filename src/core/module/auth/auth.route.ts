import { Router } from 'express';
import { registerUser } from './auth.controller';

const router = Router();

/*
 * POST Api for registering the user in the database
 */
router.post('/register', registerUser);

export default router;
