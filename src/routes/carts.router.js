import { Router } from 'express';
import Cart from '../dao/models/Cart.js';       // ← ruta corregida
import Product from '../dao/models/Product.js'; // ← ruta corregida

const router = Router();

// 🛒 Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().lean();
    res.json(carts);
  } catch (err) {
    console.error('❌ Error al obtener carritos:', err);
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// 🆕 Crear un nuevo carrito vacío
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    console.error('❌ Error al crear carrito:', err);
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// 🔍 Obtener carrito por ID con .populate()
router.get('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    console.error('❌ Error al obtener carrito:', err);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// ➕ Agregar producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const [cart, product] = await Promise.all([
      Cart.findById(cid),
      Product.findById(pid)
    ]);

    if (!cart) return res.status(404).json({ error: '🛒 Carrito no encontrado' });
    if (!product) return res.status(404).json({ error: '📦 Producto no encontrado' });

    const existing = cart.products.find(p => p.product.toString() === pid);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    console.error('❌ Error interno al agregar producto al carrito:', err);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// 🔢 Actualizar cantidad de producto en carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    const product = await Product.findById(pid);

    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const item = cart.products.find(p => p.product.toString() === pid);
    if (!item) return res.status(404).json({ error: 'Producto no está en el carrito' });

    item.quantity = quantity;
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    console.error('❌ Error al actualizar cantidad del producto:', err);
    res.status(500).json({ error: 'Error al actualizar cantidad del producto' });
  }
});

// 🔁 Reemplazar todos los productos del carrito
router.put('/:cid', async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    for (const item of products) {
      const exists = await Product.exists({ _id: item.product });
      if (!exists) {
        return res.status(400).json({ error: `Producto no válido: ${item.product}` });
      }
    }

    cart.products = products;
    await cart.save();
    res.json({ status: 'success', cart });
  } catch (err) {
    console.error('❌ Error al actualizar carrito:', err);
    res.status(500).json({ error: 'Error al actualizar carrito' });
  }
});

// ❌ Eliminar producto específico del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (err) {
    console.error('❌ Error al eliminar producto del carrito:', err);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// 🧹 Vaciar carrito completamente
router.delete('/:cid', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    cart.products = [];
    await cart.save();
    res.json({ status: 'success', message: 'Carrito vaciado correctamente' });
  } catch (err) {
    console.error('❌ Error al vaciar carrito:', err);
    res.status(500).json({ error: 'Error al vaciar carrito' });
  }
});

export default router;
