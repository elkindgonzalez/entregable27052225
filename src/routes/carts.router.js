import { Router } from 'express';
import Cart from '../models/Cart.js';

const router = Router();

// 🔍 Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().lean();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// 🛒 Crear un nuevo carrito vacío
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// 🛒 Obtener un carrito con productos completos (populate)
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// ➕ Agregar un producto al carrito (o aumentar cantidad)
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// ❌ Eliminar un producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// 🔁 Reemplazar todos los productos del carrito
router.put('/:cid', async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = products;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar carrito' });
  }
});

// 🔢 Actualizar cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    const product = cart.products.find(p => p.product.toString() === req.params.pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar cantidad del producto' });
  }
});

// 🧹 Vaciar carrito completamente
router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json({ message: 'Carrito vaciado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});

export default router;
