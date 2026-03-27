import { Router } from 'express';
import {
    genResetToken,
    loginUser,
    registerUser,
    resetUserPassword,
    verifyUser
} from './auth.controller';

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

router.post('/genresettoken', genResetToken);

router.post('/resetpass', resetUserPassword);

export default router;
