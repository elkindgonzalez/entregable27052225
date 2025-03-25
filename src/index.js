import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { configureSockets } from "./sockets/socketHandler.js";
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const PORT = 8080;

// Servidor HTTP
const server = app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
const io = new Server(server);

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "src", "views")); // Corrección de la ruta de vistas

// Middlewares
app.use(express.static(path.join(process.cwd(), "src", "public"))); // Corrección de la ruta de archivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Configurar WebSockets
configureSockets(io);
