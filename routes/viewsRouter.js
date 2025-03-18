import { Router } from "express";

const router = Router();

// Ruta para la vista principal
router.get("/", (req, res) => {
    res.render("home", { title: "Lista de Productos" });
});

// Ruta para la vista en tiempo real
router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", { title: "Productos en Tiempo Real" });
});

export default router;
