import { Router } from "express";
import { getProducts, addProduct, deleteProduct } from "../data/products.js";

const router = Router();

// Obtener todos los productos
router.get("/", (req, res) => {
  res.json(getProducts());
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
  const product = getProducts().find(p => p.id === parseInt(req.params.id));
  product
    ? res.json(product)
    : res.status(404).json({ message: "Producto no encontrado" });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  const newProduct = addProduct(req.body);
  res.status(201).json(newProduct);
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
  const deleted = deleteProduct(req.params.id);
  if (deleted) {
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

export default router;
