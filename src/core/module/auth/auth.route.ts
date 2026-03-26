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

/*
 * POST Api for resetting user account password from the database
 */

// router.post('/password-reset', );

export default router;
