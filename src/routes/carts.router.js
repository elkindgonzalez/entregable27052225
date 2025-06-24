import { Router } from 'express';
import Cart from '../dao/models/Cart.js';
import Product from '../dao/models/Product.js';
import { auth } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

// 🛒 Obtener todos los carritos (público o solo admin)
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().lean();
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener carritos' });
  }
});

// 🆕 Crear carrito vacío (opcionalmente protegido)
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart({ products: [] });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// 🔍 Obtener carrito por ID con productos
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

    if (!cart || !product) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }

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

// 🔢 Actualizar cantidad (solo usuario)
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

// 🔁 Reemplazar todos los productos (solo usuario)
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

// ❌ Eliminar producto (solo usuario)
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

// 🧹 Vaciar carrito completamente (solo usuario)
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

export default router;
