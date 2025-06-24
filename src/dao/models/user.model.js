import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

// 🔐 Hasheo automático de la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

export const UserModel = mongoose.model('Users', userSchema);
