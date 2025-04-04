import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// GET /api/products con paginación, filtros y ordenamiento
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined
    };

    const filter = query
      ? {
          $or: [
            { category: query },
            { name: new RegExp(query, 'i') },
            { availability: query }
          ]
        }
      : {};

    const result = await Product.paginate(filter, options);

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const buildLink = (p) => `${baseUrl}?page=${p}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`;

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });
  } catch (error) {
    console.error('❌ Error en GET /products:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
  }
});

// 🆕 POST /api/products - Agregar nuevo producto
router.post('/', async (req, res) => {
  const { name, price, description, stock, thumbnails } = req.body;

  try {
    const newProduct = new Product({ name, price, description, stock, thumbnails });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(' Error al crear producto:', error);
    res.status(400).json({ error: 'Error al crear producto' });
  }
});

//  DELETE /api/products/:id - Eliminar producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;
