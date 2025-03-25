import Product from "../models/Product.js";

export function configureSockets(io) {
  io.on("connection", async (socket) => {
    console.log("🟢 Usuario conectado por WebSocket");

    // Enviar productos actuales desde Mongo
    const products = await Product.find();
    socket.emit("updateProducts", products);

    // Escuchar nuevo producto
    socket.on("newProduct", async (productData) => {
      try {
        const newProduct = new Product(productData);
        await newProduct.save();
        const updatedProducts = await Product.find();
        io.emit("updateProducts", updatedProducts);
      } catch (err) {
        console.error("❌ Error al guardar producto vía socket:", err.message);
      }
    });

    // Escuchar eliminación
    socket.on("deleteProduct", async (id) => {
      try {
        await Product.findByIdAndDelete(id);
        const updatedProducts = await Product.find();
        io.emit("updateProducts", updatedProducts);
      } catch (err) {
        console.error("❌ Error al eliminar producto vía socket:", err.message);
      }
    });
  });
}
