// src/index.js
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import passport from "./config/passport.js";                       // ➜ Passport

/* ---------- Routers ---------- */
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/api/users.router.js";            // ➜ Nuevo
import sessionsRouter from "./routes/api/sessions.router.js";      // ➜ Nuevo

import { configureSockets } from "./sockets/socketHandler.js";

dotenv.config();
await connectDB();  // Asegura conexión antes de levantar el servidor

/* ---------- Constantes ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

/* ---------- Handlebars ---------- */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());              // ➜ Inicializa Passport

/* ---------- Rutas ---------- */
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);          // ➜ CRUD de usuarios
app.use("/api/sessions", sessionsRouter);    // ➜ Login + /current

/* ---------- Servidor HTTP & WebSocket ---------- */
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const io = new Server(server);
configureSockets(io);
