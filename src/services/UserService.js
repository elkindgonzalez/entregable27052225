import UserRepository from '../repositories/UserRepository.js';
import { hashPassword } from '../utils/crypto.js';

class UserService {
  async registerUser(userData) {
    const { email, password, ...rest } = userData;

    const existingUser = await UserRepository.getByEmail(email);
    if (existingUser) {
      throw new Error('Email ya registrado');
    }

    const hashed = hashPassword(password);
    return await UserRepository.create({
      ...rest,
      email,
      password: hashed,
      role: 'user'
    });
  }

  async getAllUsers() {
    const users = await UserRepository.getAll();
    return users.map(({ password, ...user }) => user); // excluir contraseña
  }

  async getUserById(id) {
    const user = await UserRepository.getById(id);
    if (!user) return null;
    const { password, ...userData } = user.toObject();
    return userData;
  }

  async updateUser(id, updates) {
    if (updates.password) {
      updates.password = hashPassword(updates.password);
    }
    const updated = await UserRepository.update(id, updates);
    if (!updated) return null;
    const { password, ...userData } = updated.toObject();
    return userData;
  }

  async deleteUser(id) {
    return await UserRepository.delete(id);
  }
}

export default new UserService();
