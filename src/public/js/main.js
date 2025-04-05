const socket = window.socket || io();
window.socket = socket;

// 🧩 Escuchar productos actualizados y renderizar
socket.on("updateProducts", (products) => {
  const productList = document.getElementById("productList");
  if (productList) {
    productList.innerHTML = ""; // Limpia para evitar duplicados
    products.forEach(product => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${product.name}</strong> - $${product.price} <br>
        <em>${product.description}</em> <br>
        Stock: ${product.stock} <br>
        <img src="${product.thumbnails}" width="50" alt="imagen"> <br>
        <button onclick="deleteProduct('${product._id}')">❌ Eliminar</button>
      `;
      productList.appendChild(li);
    });
  }
});

// 🧨 Enviar solicitud para eliminar un producto
function deleteProduct(productId) {
  socket.emit("deleteProduct", productId, (response) => {
    if (response?.status === "success") {
      alert("✅ Producto eliminado");
    } else {
      alert("❌ Error al eliminar: " + (response?.message || "Error desconocido"));
    }
  });
}

// ✅ ✅ Solo una vez: Capturar evento de formulario
window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  if (form && !form.dataset.listenerAdded) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const price = document.getElementById("price").value;
      const description = document.getElementById("description").value;
      const stock = document.getElementById("stock").value;
      const thumbnails = document.getElementById("thumbnails").value;

      const newProduct = { name, price, description, stock, thumbnails };

      socket.emit("newProduct", newProduct, (response) => {
        if (response?.status === "success") {
          alert("✅ Producto creado");
          form.reset();
        } else {
          alert("❌ Error al crear: " + (response?.message || "Error desconocido"));
        }
      });
    });

    // ⚠️ Marcar que el listener ya fue agregado
    form.dataset.listenerAdded = "true";
  }
});

window.deleteProduct = deleteProduct;
