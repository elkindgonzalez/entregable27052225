export default class BaseRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getAll(filter = {}) {
      return await this.dao.find(filter);
    }
  
    async getById(id) {
      return await this.dao.findById(id);
    }
  
    async create(data) {
      return await this.dao.create(data);
    }
  
    async update(id, data) {
      return await this.dao.findByIdAndUpdate(id, data, { new: true });
    }
  
    async delete(id) {
      return await this.dao.findByIdAndDelete(id);
    }
  }
  