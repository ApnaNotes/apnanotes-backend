import { Router } from 'express';
import {
    genResetToken,
    loginUser,
    registerUser,
    resetUserPassword,
    verifyUser
} from './auth.controller';
import { googleLoginProvider } from './googleProvider';

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

router.post('/pass/reset', resetUserPassword);
router.post('/pass/reset/token', genResetToken);

/*
 * POST Api to login from google oAuth Provider
 */

router.get('/google/callback', googleLoginProvider);
export default router;
