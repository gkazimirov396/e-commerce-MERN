import { Router } from 'express';

import validation from '../middleware/validation.js';
import authController from '../controllers/authController.js';

const router = Router();

router.post('/register', validation.signup, authController.handleSignup);

router.post('/login', validation.login, authController.handleLogin);

export default router;
