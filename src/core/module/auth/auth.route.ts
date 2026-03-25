import { Router } from 'express';
import { loginUser, registerUser, verifyUser } from './auth.controller';

const router = Router();

/*
 * POST Api for registering the user in the database
 */
router.post('/register', registerUser);

/*
 * POST Api for retreiving the user from the database
 */
router.post('/login', loginUser);

router.post('/verification', verifyUser);

export default router;
