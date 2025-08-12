// src/index.js
import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import passport from "./config/passport.js";                       // ➜ Passport
import { errorHandler } from "./middlewares/errorHandler.js";      // ➜ Middleware de errores

/* ---------- Routers ---------- */
import viewsRouter from "./routes/viewsRouter.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import usersRouter from "./routes/api/users.router.js";            // ➜ CRUD de usuarios
import sessionsRouter from "./routes/api/sessions.router.js";      // ➜ Login + /current
import mocksRouter from "./routes/api/mocks.router.js";            // ✅ Mocking router

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
app.use("/api/mocks", mocksRouter);          // ✅ Mocking endpoints

/* ---------- Middleware Global de Errores ---------- */
app.use(errorHandler);

/* ---------- Servidor HTTP & WebSocket ---------- */
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const io = new Server(server);
configureSockets(io);
