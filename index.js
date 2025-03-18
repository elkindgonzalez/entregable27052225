import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { configureSockets } from "./sockets/socketHandler.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const server = app.listen(3000, () => console.log("Servidor en puerto 3000"));
const io = new Server(server);

// Configurar Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(process.cwd(), "views"));

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/", viewsRouter);

// Configurar WebSockets
configureSockets(io);
