import fs from 'fs/promises';
const path = 'src/data/products.json';

export default class ProductManagerFS {
  async getProducts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = Date.now();
    products.push(product);
    await fs.writeFile(path, JSON.stringify(products, null, 2));
    return product;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    await fs.writeFile(path, JSON.stringify(filtered, null, 2));
    return products.length !== filtered.length;
  }
}
