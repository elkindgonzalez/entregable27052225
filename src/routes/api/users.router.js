// src/routes/api/users.router.js
import { Router } from 'express';
import { registerUser } from '../../controllers/users.controller.js';

const router = Router();

/* Endpoint: POST /api/users */
router.post('/', registerUser);

/* [Opcional] añadir CRUD completo más adelante */

export default router;
