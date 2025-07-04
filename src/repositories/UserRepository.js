import BaseRepository from './BaseRepository.js';
import { UserModel } from '../dao/models/user.model.js';

class UserRepository extends BaseRepository {
  constructor() {
    super(UserModel);
  }

  async getByEmail(email) {
    return await this.dao.findOne({ email });
  }

  async changePassword(userId, newPassword) {
    return await this.dao.findByIdAndUpdate(userId, { password: newPassword }, { new: true });
  }

  // Puedes agregar más métodos específicos para usuarios aquí
}

export default new UserRepository();
