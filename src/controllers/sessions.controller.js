import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { UserModel } from '../dao/models/user.model.js';
import { sendEmail } from '../utils/mailer.js';
import { hashPassword } from '../utils/crypto.js';
import UserDTO from '../dto/UserDTO.js';

dotenv.config();

/**
 * POST /api/sessions/login
 */
export const loginSuccess = (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { sub: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ message: 'Login exitoso', token });
};

/**
 * GET /api/sessions/current
 */
export const currentUser = (req, res) => {
  const safeUser = new UserDTO(req.user);
  res.json({ user: safeUser });
};

/**
 * POST /api/sessions/forgot-password
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  const token = crypto.randomBytes(20).toString('hex');
  const expires = Date.now() + 3600000; // 1 hora

  user.resetToken = token;
  user.resetTokenExp = expires;
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    user.email,
    'Recuperación de contraseña',
    `Haz clic para restablecer tu contraseña: <a href="${resetLink}">${resetLink}</a>`
  );

  res.json({ message: 'Correo de recuperación enviado' });
};

/**
 * POST /api/sessions/reset-password
 */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const user = await UserModel.findOne({
    resetToken: token,
    resetTokenExp: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ error: 'Token inválido o expirado' });
  }

  // Verificar que la nueva contraseña no sea igual a la anterior
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) {
    return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' });
  }

  user.password = hashPassword(newPassword);
  user.resetToken = undefined;
  user.resetTokenExp = undefined;
  await user.save();

  res.json({ message: 'Contraseña actualizada correctamente' });
};
