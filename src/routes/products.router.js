import { Router } from 'express';
import Cart from '../dao/models/Cart.js';
import Product from '../dao/models/Product.js';
import Ticket from '../dao/models/Ticket.js';
import { auth } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// 🛒 Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().lean();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// 🆕 Crear carrito vacío
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// 🔍 Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// ➕ Agregar producto al carrito (solo usuario)
router.post('/:cid/products/:pid', auth, authorize('user'), async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const [cart, product] = await Promise.all([
      Cart.findById(cid),
      Product.findById(pid)
    ]);

    if (!cart || !product) return res.status(404).json({ error: 'Carrito o producto no encontrado' });

    const existing = cart.products.find(p => p.product.toString() === pid);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// 🔢 Actualizar cantidad de producto
router.put('/:cid/products/:pid', auth, authorize('user'), async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    const item = cart?.products.find(p => p.product.toString() === pid);
    if (!cart || !item) return res.status(404).json({ error: 'Datos no encontrados' });

    item.quantity = quantity;
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad' });
  }
});

// 🔁 Reemplazar todos los productos
router.put('/:cid', auth, authorize('user'), async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    for (const item of products) {
      const exists = await Product.exists({ _id: item.product });
      if (!exists) {
        return res.status(400).json({ error: `Producto inválido: ${item.product}` });
      }
    }

    cart.products = products;
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar carrito' });
  }
});

// ❌ Eliminar producto
router.delete('/:cid/products/:pid', auth, authorize('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// 🧹 Vaciar carrito completamente
router.delete('/:cid', auth, authorize('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json({ status: 'success', message: 'Carrito vaciado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});

// 💰 Finalizar compra (genera ticket)
router.post('/:cid/purchase', auth, authorize('user'), async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    let totalAmount = 0;
    const productsNotPurchased = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        totalAmount += product.price * quantity;
        await product.save();
      } else {
        productsNotPurchased.push(item);
      }
    }

    if (totalAmount > 0) {
      const ticket = new Ticket({
        code: uuidv4(),
        amount: totalAmount,
        purchaser: req.user.email
      });
      await ticket.save();
    }

    cart.products = productsNotPurchased;
    await cart.save();

    res.json({
      status: 'success',
      message: 'Compra procesada',
      total: totalAmount,
      productos_no_comprados: productsNotPurchased.map(p => ({
        id: p.product._id,
        title: p.product.title,
        stock_disponible: p.product.stock
      }))
    });
  } catch (error) {
    console.error('❌ Error al procesar compra:', error);
    res.status(500).json({ error: 'Error interno al procesar la compra' });
  }
});

export default router;
