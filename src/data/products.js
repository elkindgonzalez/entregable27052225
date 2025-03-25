let products = [
    {
      id: 1,
      name: "Laptop",
      description: "Laptop gamer",
      price: 1000,
      stock: 10,
      thumbnails: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    },
    {
      id: 2,
      name: "Mouse",
      description: "Mouse inalámbrico",
      price: 50,
      stock: 25,
      thumbnails: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    }
  ];
  
  // Exportar funciones para acceder/modificar el array
  export function getProducts() {
    return products;
  }
  
  export function addProduct(product) {
    if (!product.id) {
      product.id = Date.now();
    }
    products.push(product);
    return product;
  }
  
  export function deleteProduct(id) {
    const before = products.length;
    products = products.filter(p => p.id !== parseInt(id));
    return products.length < before;
  }
  