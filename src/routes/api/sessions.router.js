// src/routes/api/sessions.router.js
import { Router } from 'express';
import passport from '../../config/passport.js';
import { loginSuccess } from '../../controllers/sessions.controller.js';

const router = Router();

/* Login: POST /api/sessions/login */
router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  loginSuccess
);

/* El endpoint /current lo añadiremos en el siguiente paso */

export default router;
