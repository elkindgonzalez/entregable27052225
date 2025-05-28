// src/routes/api/users.router.js
import { Router } from 'express';
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../../controllers/users.controller.js';
import { authJWT } from '../../middlewares/auth.js';
import { authorize } from '../../middlewares/authorize.js';

const router = Router();

// Registro público
router.post('/', registerUser);

// CRUD de usuarios (solo admin)
router.get('/', authJWT, authorize('admin'), getUsers);
router.get('/:uid', authJWT, authorize('admin'), getUserById);
router.put('/:uid', authJWT, authorize('admin'), updateUser);
router.delete('/:uid', authJWT, authorize('admin'), deleteUser);

export default router;
