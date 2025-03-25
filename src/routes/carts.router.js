import { Router } from "express";

const router = Router();

let carts = [
    { id: 1, products: [] }
];

// Obtener todos los carritos
router.get("/", (req, res) => {
    res.json(carts);
});

// Obtener un carrito por ID
router.get("/:id", (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    cart ? res.json(cart) : res.status(404).json({ message: "Carrito no encontrado" });
});

// Crear un nuevo carrito
router.post("/", (req, res) => {
    const newCart = { id: carts.length + 1, products: [] };
    carts.push(newCart);
    res.status(201).json(newCart);
});

// Agregar un producto a un carrito
router.post("/:id/product/:productId", (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const { productId } = req.params;
    cart.products.push({ productId: parseInt(productId), quantity: 1 });
    res.json(cart);
});

// Eliminar un producto de un carrito
router.delete("/:id/product/:productId", (req, res) => {
    const cart = carts.find(c => c.id === parseInt(req.params.id));
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.products = cart.products.filter(p => p.productId !== parseInt(req.params.productId));
    res.json(cart);
});

export default router;
