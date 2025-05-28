import { Router } from "express";
import Product from "../dao/models/Product.js";     // ← ruta corregida

const router = Router();

// 📄 GET /api/products - Listado con paginación, filtros, ordenamiento
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort:
        sort === "asc"
          ? { price: 1 }
          : sort === "desc"
          ? { price: -1 }
          : undefined
    };

    const filter = query
      ? {
          $or: [
            { category: { $regex: query, $options: "i" } },
            { status: query === "true" }
          ]
        }
      : {};

    const result = await Product.paginate(filter, options);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
    const buildLink = (p) =>
      `${baseUrl}?page=${p}&limit=${limit}${
        sort ? `&sort=${sort}` : ""
      }${query ? `&query=${query}` : ""}`;

    res.json({
      status: "success",
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
    console.error("❌ Error en GET /products:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener productos" });
  }
});

// 🔎 GET /api/products/:pid - Obtener producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ status: "success", product });
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al obtener producto" });
  }
});

// 🆕 POST /api/products - Crear producto
router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails = []
  } = req.body;

  try {
    const newProduct = new Product({
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ status: "success", product: savedProduct });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// 🔁 PUT /api/products/:pid - Actualizar producto (sin modificar _id)
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updateData = { ...req.body };
  if (updateData._id) delete updateData._id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }

    res.json({ status: "success", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(400).json({ status: "error", message: error.message });
  }
});

// 🗑️ DELETE /api/products/:id - Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error al eliminar producto" });
  }
});

export default router;
