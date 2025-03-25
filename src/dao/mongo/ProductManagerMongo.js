import Product from '../../models/Product.js';

export default class ProductManagerMongo {
  async getProducts() {
    return await Product.find();
  }

  async addProduct(product) {
    return await Product.create(product);
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  async updateProduct(id, updates) {
    return await Product.findByIdAndUpdate(id, updates, { new: true });
  }

  async getProductById(id) {
    return await Product.findById(id);
  }
}
