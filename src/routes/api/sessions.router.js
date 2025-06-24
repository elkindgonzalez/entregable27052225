import { Router } from 'express';
import passport from '../../config/passport.js';
import {
  loginSuccess,
  currentUser,
  forgotPassword,
  resetPassword
} from '../../controllers/sessions.controller.js';
import { authJWT } from '../../middlewares/auth.js';

const router = Router();

router.post('/login',
  passport.authenticate('login', { session: false }),
  loginSuccess
);

router.get('/current', authJWT, currentUser);

// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password', resetPassword);

export default router;
