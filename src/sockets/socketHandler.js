let products = []; // Simulación de base de datos en memoria

export function configureSockets(io) {
    io.on("connection", (socket) => {
        console.log("Nuevo usuario conectado");

        // Enviar la lista de productos actual al cliente
        socket.emit("updateProducts", products);

        // Escuchar cuando se agrega un nuevo producto
        socket.on("newProduct", (product) => {
            if (!product.id) {
                product.id = Date.now().toString(); // ✅ Asegurar que el ID sea string
            }
            products.push(product);
            io.emit("updateProducts", products); // Notificar a todos los clientes
        });

        // Escuchar cuando se elimina un producto
        socket.on("deleteProduct", (id) => {
            console.log("Solicitud de eliminación recibida. ID:", id); // ✅ Verificar si el servidor recibe la solicitud
            products = products.filter((product) => product.id !== id); // ✅ Comparación correcta
            io.emit("updateProducts", products); // Enviar lista actualizada
        });
    });
}
