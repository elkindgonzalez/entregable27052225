import { Router } from "express";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const router = Router();

// 🏠 Página principal con acceso a productos y carrito
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findOne().lean(); // buscamos el primer carrito
    const defaultCartId = cart?._id || null;

    res.render("home", {
      title: "Inicio",
      defaultCartId
    });
  } catch (err) {
    console.error("❌ Error al obtener carrito:", err.message);
    res.render("home", {
      title: "Inicio",
      defaultCartId: null
    });
  }
});

// ⚡ Vista en tiempo real
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { title: "Productos en Tiempo Real" });
});

// 🛍️ Vista paginada de productos
router.get("/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
      lean: true
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

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}/products`;
    const buildLink = (p) => `${baseUrl}?page=${p}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`;

    res.render("products", {
      title: "Productos",
      products: result.docs,
      page: result.page,
      totalPages: result.totalPages,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    res.status(500).send("Error al cargar productos");
  }
});

// 🛒 Vista de un carrito por ID (poblado)
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate("products.product").lean();
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", {
      title: "Carrito de Compras",
      products: cart.products
    });
  } catch (err) {
    console.error("❌ Error al mostrar carrito:", err);
    res.status(500).send("Error interno al obtener el carrito");
  }
});

export default router;
