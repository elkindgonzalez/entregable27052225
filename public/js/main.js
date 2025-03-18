const socket = io();

socket.on("updateProducts", (products) => {
    const productList = document.getElementById("productList");
    if (productList) {
        productList.innerHTML = "";
        products.forEach(product => {
            const li = document.createElement("li");
            li.innerText = `${product.name} - $${product.price}`;
            productList.appendChild(li);
        });
    }
});
