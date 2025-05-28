// src/utils/crypto.js
import bcrypt from 'bcryptjs';

/* Hashea la contraseña en texto plano */
export const hashPassword = (plainText) =>
  bcrypt.hashSync(plainText, bcrypt.genSaltSync(12));

/* Compara contraseña en texto plano con el hash almacenado */
export const checkPassword = (plainText, hashed) =>
  bcrypt.compareSync(plainText, hashed);
