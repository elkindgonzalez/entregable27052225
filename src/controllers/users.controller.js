// src/controllers/users.controller.js

import { UserModel } from '../dao/models/user.model.js';
import { hashPassword } from '../utils/crypto.js';

/**
 * POST /api/users
 * Registra un nuevo usuario con contraseña cifrada.
 */
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // Evitar emails duplicados
    if (await UserModel.findOne({ email })) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    // Cifrar contraseña y crear usuario
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
      role: 'user'
    });

    return res.status(201).json({
      message: 'Usuario creado',
      payload: { _id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('❌ Error en registerUser:', err);
    return res.status(500).json({ error: 'Error interno al registrar usuario' });
  }
};

/**
 * GET /api/users   (admin)
 * Lista todos los usuarios, sin exponer su contraseña.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password').lean();
    return res.json({ users });
  } catch (err) {
    console.error('❌ Error en getUsers:', err);
    return res.status(500).json({ error: 'Error interno al obtener usuarios' });
  }
};

/**
 * GET /api/users/:uid   (admin)
 * Obtiene un usuario por su ID, sin exponer la contraseña.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.uid).select('-password').lean();
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ user });
  } catch (err) {
    console.error('❌ Error en getUserById:', err);
    return res.status(500).json({ error: 'Error interno al obtener usuario' });
  }
};

/**
 * PUT /api/users/:uid   (admin)
 * Actualiza un usuario. Si incluye nueva contraseña, la cifra.
 */
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
    const updated = await UserModel.findByIdAndUpdate(
      req.params.uid,
      updates,
      { new: true, runValidators: true }
    )
      .select('-password')
      .lean();

    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario actualizado', user: updated });
  } catch (err) {
    console.error('❌ Error en updateUser:', err);
    return res.status(500).json({ error: 'Error interno al actualizar usuario' });
  }
};

/**
 * DELETE /api/users/:uid   (admin)
 * Elimina un usuario por ID.
 */
export const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(req.params.uid);
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error en deleteUser:', err);
    return res.status(500).json({ error: 'Error interno al eliminar usuario' });
  }
};
