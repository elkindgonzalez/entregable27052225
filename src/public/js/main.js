const socket = io();

// Escuchar productos actualizados y mostrarlos en la lista
socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    if (productList) {
        productList.innerHTML = "";
        products.forEach(product => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${product.name}</strong> - $${product.price} <br>
                <em>${product.description}</em> <br>
                Stock: ${product.stock} <br>
                <img src="${product.thumbnails}" width="50"> <br>
            `;
            productList.appendChild(li);
        });
    }
});

// Capturar el envío del formulario y enviar producto al servidor
document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const thumbnails = document.getElementById("thumbnails").value;

    // Enviar producto al servidor
    socket.emit("newProduct", { name, price, description, stock, thumbnails });

    // Limpiar formulario
    event.target.reset();
});
