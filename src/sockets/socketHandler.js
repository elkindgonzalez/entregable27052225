import { getProducts, addProduct, deleteProduct } from "../data/products.js";

export function configureSockets(io) {
  io.on("connection", (socket) => {
    console.log("🟢 Usuario conectado por WebSocket");

    // Enviar productos actuales
    socket.emit("updateProducts", getProducts());

    // Escuchar nuevo producto
    socket.on("newProduct", (product) => {
      const newProd = addProduct(product);
      io.emit("updateProducts", getProducts());
    });

    // Escuchar eliminación
    socket.on("deleteProduct", (id) => {
      const deleted = deleteProduct(id);
      if (deleted) {
        io.emit("updateProducts", getProducts());
      }
    });
  });
}
