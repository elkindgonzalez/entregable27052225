// src/dao/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name:  { type: String, required: true },
    email:      { type: String, required: true, unique: true, index: true },
    age:        { type: Number, min: 0 },
    password:   { type: String, required: true },
    cart:       { type: mongoose.Schema.Types.ObjectId, ref: 'Carts' },
    role:       { type: String, default: 'user', enum: ['user', 'admin'] },

    // 🔐 Campos para recuperación de contraseña
    resetToken:    { type: String },
    resetTokenExp: { type: Date }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('Users', userSchema);
