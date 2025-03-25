import { Router } from "express";

const router = Router();

let products = [
    { id: 1, name: "Laptop", description: "Laptop gamer", stock: 10, thumbnails: ["image1.jpg"] },
    { id: 2, name: "Mouse", description: "Mouse inalámbrico", stock: 25, thumbnails: ["image2.jpg"] }
];

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(products);
});

// Obtener un producto por ID
router.get("/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ message: "Producto no encontrado" });
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
    const newProduct = { id: products.length + 1, ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Actualizar un producto
router.put("/:id", (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Producto no encontrado" });
    }
});

// Eliminar un producto
router.delete("/:id", (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.json({ message: "Producto eliminado" });
});

export default router;
