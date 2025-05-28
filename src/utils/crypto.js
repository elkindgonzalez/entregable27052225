// src/utils/crypto.js
import bcrypt from 'bcryptjs';

/**
 * Cifra texto plano con bcrypt.
 * @param {string} pwd 
 * @returns {string} hash
 */
export const hashPassword = (pwd) => bcrypt.hashSync(pwd, 10);

/**
 * Compara texto plano con hash.
 * @param {string} pwd 
 * @param {string} hash 
 * @returns {boolean}
 */
export const checkPassword = (pwd, hash) => bcrypt.compareSync(pwd, hash);
