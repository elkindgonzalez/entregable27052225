import fs from 'fs/promises';
const path = 'src/data/carts.json';

export default class CartsManagerFS {
  async getCarts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async addCart(cart) {
    const carts = await this.getCarts();
    cart.id = Date.now();
    carts.push(cart);
    await fs.writeFile(path, JSON.stringify(carts, null, 2));
    return cart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === parseInt(id));
  }
}
