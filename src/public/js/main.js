const socket = window.socket || io();
window.socket = socket;

// 🧩 Escuchar productos actualizados y renderizar
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
        <button onclick="deleteProduct('${product._id}')">❌ Eliminar</button>
      `;
      productList.appendChild(li);
    });
  }
});

// 🧨 Enviar solicitud para eliminar un producto
function deleteProduct(productId) {
  console.log("Intentando eliminar el producto con ID:", productId);

  socket.emit("deleteProduct", productId, (response) => {
    if (response?.status === "success") {
      alert("✅ Producto eliminado correctamente");
    } else {
      alert("❌ Error al eliminar producto: " + (response?.message || "Error desconocido"));
    }
  });
}

// 🛠️ Capturar envío del formulario
document.getElementById("productForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const stock = document.getElementById("stock").value;
  const thumbnails = document.getElementById("thumbnails").value;

  const newProduct = { name, price, description, stock, thumbnails };

  // Emitir y esperar confirmación para evitar duplicados
  socket.emit("newProduct", newProduct, (response) => {
    if (response?.status === "success") {
      alert("✅ Producto creado correctamente");
      event.target.reset(); // Limpia el form
    } else {
      alert("❌ Error al crear producto: " + (response?.message || "Error desconocido"));
    }
  });
});

// ⬇️ Expone globalmente la función de eliminar
window.deleteProduct = deleteProduct;
