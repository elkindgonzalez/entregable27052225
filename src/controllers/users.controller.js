// src/controllers/users.controller.js
import { UserModel } from '../dao/models/user.model.js';
import { hashPassword } from '../utils/crypto.js';

/*  POST /api/users  */
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    /* Evitar emails duplicados */
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }

    /* Crear usuario con contraseña cifrada */
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password)
    });

    return res.status(201).json({
      message: 'Usuario creado',
      payload: { _id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al crear usuario' });
  }
};
