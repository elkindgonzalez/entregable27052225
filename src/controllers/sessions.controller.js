// src/controllers/sessions.controller.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/* POST /api/sessions/login  ───────────
   Passport-local pone el usuario verificado en req.user.
   Generamos y devolvemos un token JWT. */
export const loginSuccess = (req, res) => {
  const user = req.user;                           // { _id, role, ... }

  const token = jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ message: 'Login exitoso', token });
};

/* GET /api/sessions/current  ──────────
   authJWT añade req.user a la request.
   Devolvemos los datos básicos del usuario autenticado. */
export const currentUser = (req, res) => {
  const { _id, first_name, last_name, email, role } = req.user;
  res.json({ _id, first_name, last_name, email, role });
};
