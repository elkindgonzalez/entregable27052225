import { Router } from 'express';
import passport from '../../config/passport.js';
import { loginSuccess, currentUser } from '../../controllers/sessions.controller.js';
import { authJWT } from '../../middlewares/auth.js';

const router = Router();

router.post('/login',
  passport.authenticate('login', { session: false }),
  loginSuccess
);

router.get('/current', authJWT, currentUser);

export default router;
