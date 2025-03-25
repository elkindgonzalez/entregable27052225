import Cart from '../../models/Cart.js';

export default class CartsManagerMongo {
  async createCart() {
    const newCart = new Cart({ products: [] });
    return await newCart.save();
  }

  async getCarts() {
    return await Cart.find().populate('products.product');
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    const existing = cart.products.find(p => p.product.toString() === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    return await cart.save();
  }
}
