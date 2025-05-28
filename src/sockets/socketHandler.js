import Product from "../dao/models/Product.js";   // ← ruta corregida

export function configureSockets(io) {
  io.on("connection", async (socket) => {
    console.log("🟢 Usuario conectado por WebSocket");

    // Enviar productos actuales desde Mongo
    const products = await Product.find();
    socket.emit("updateProducts", products);

    // 🎯 Escuchar nuevo producto
    socket.on("newProduct", async (productData, callback) => {
      try {
        const newProduct = new Product(productData);
        await newProduct.save();

        const updatedProducts = await Product.find();
        io.emit("updateProducts", updatedProducts);

        if (callback) {
          callback({ status: "success", message: "Producto creado" });
        }
      } catch (err) {
        console.error("❌ Error al guardar producto vía socket:", err.message);
        if (callback) {
          callback({ status: "error", message: err.message });
        }
      }
    });

    // 🧨 Escuchar eliminación
    socket.on("deleteProduct", async (id, callback) => {
      try {
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
          if (callback) {
            callback({ status: "error", message: "Producto no encontrado" });
          }
          return;
        }

        const updatedProducts = await Product.find();
        io.emit("updateProducts", updatedProducts);

        if (callback) {
          callback({ status: "success", message: "Producto eliminado" });
        }
      } catch (err) {
        console.error("❌ Error al eliminar producto vía socket:", err.message);
        if (callback) {
          callback({ status: "error", message: err.message });
        }
      }
    });
  });
}
