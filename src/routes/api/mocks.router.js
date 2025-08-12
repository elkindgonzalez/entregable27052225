// src/routes/api/mocks.router.js
import { Router } from 'express';
import { generateUser } from '../../mocks/userMock.js';

const router = Router();

// 🐾 Endpoint antiguo migrado: mockingpets
router.get('/mockingpets', (_req, res) => {
  return res.json({ message: '✅ mockingpets funciona correctamente' });
});

// 👤 Endpoint nuevo: mockingusers
router.get('/mockingusers', (_req, res) => {
  const users = Array.from({ length: 50 }, () => generateUser());
  return res.json({ users });
});

export default router;
