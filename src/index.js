import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import http from "http"; // ✅ Importamos http para crear el servidor
import path from "path";
import { fileURLToPath } from "url";
import { configureSockets } from "./sockets/socketHandler.js";
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// ✅ Crear un servidor HTTP explícito
const server = http.createServer(app);
const io = new Server(server); // ✅ Pasamos el servidor a socket.io

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Configurar WebSockets
configureSockets(io);

// ✅ Iniciar el servidor correctamente
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
