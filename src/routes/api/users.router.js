// src/routes/api/users.router.js
import { Router } from 'express';
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../../controllers/users.controller.js';
import { auth } from '../../middlewares/auth.js'; // 🔁 Corregido
import { authorize } from '../../middlewares/authorize.js';
import { userSchema, validateBody } from '../../middlewares/validators.js';

const router = Router();

// Registro público
router.post(
  '/',
  validateBody(userSchema),
  registerUser
);

// CRUD de usuarios (solo admin)
router.get('/', auth, authorize('admin'), getUsers);
router.get('/:uid', auth, authorize('admin'), getUserById);
router.put('/:uid', auth, authorize('admin'), updateUser);
router.delete('/:uid', auth, authorize('admin'), deleteUser);

export default router;
