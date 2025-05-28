// src/controllers/sessions.controller.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* Ejecutado tras passport.authenticate('login') */
export const loginSuccess = (req, res) => {
  const user = req.user;               // provisto por la estrategia 'login'

  const token = jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.json({
    message: 'Login exitoso',
    token
  });
};
