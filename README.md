
# 🛍️ WebSockets + Handlebars + MongoDB

Este proyecto es una API y vista fullstack construida con Node.js, Express, MongoDB Atlas, WebSockets y Handlebars. Cumple con **todos los requisitos de la entrega final del curso de backend**.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB Atlas + Mongoose
- WebSockets (`socket.io`)
- Express Handlebars (templating)
- dotenv (.env)
- Mongoose Paginate v2

---

## 📁 Estructura del proyecto

```
src/
├── config/             # Conexión a MongoDB
├── dao/                # Persistencia (FS y Mongo)
├── models/             # Schemas Mongoose (Product, Cart)
├── public/             # JS frontend
├── routes/             # API y vistas
├── sockets/            # WebSocket handlers
├── views/              # Vistas handlebars
├── index.js            # Entry principal
```

---

## 📦 Instalación

```bash
git clone https://github.com/elkindgonzalez/websockets-handlebars.git
cd websockets-handlebars
npm install
```

Crea un archivo `.env` con tu cadena de conexión a MongoDB:

```
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/websocketsDB
```

---

## ⚙️ Ejecutar el proyecto

```bash
npm run dev
```

Servidor en: [http://localhost:8080](http://localhost:8080)

---

## 📡 WebSockets en acción

- Vista `/realtimeproducts` con formulario para agregar y eliminar productos.
- Las actualizaciones se transmiten en tiempo real a todos los clientes conectados.

---

## 🔌 Endpoints REST

### Productos `/api/products`
- `GET /` → Listado paginado, con filtros y ordenamiento
- `GET /:pid` → Obtener un producto por ID
- `POST /` → Crear nuevo producto
- `PUT /:pid` → Editar producto
- `DELETE /:pid` → Eliminar producto

### Carritos `/api/carts`
- `POST /` → Crear carrito
- `GET /:cid` → Obtener carrito con `populate`
- `POST /:cid/products/:pid` → Agregar producto
- `PUT /:cid` → Reemplazar productos del carrito
- `PUT /:cid/products/:pid` → Modificar cantidad
- `DELETE /:cid/products/:pid` → Quitar un producto
- `DELETE /:cid` → Vaciar el carrito

---

## 🖥️ Vistas dinámicas

- `/products` → Lista de productos paginada + botón para agregar al carrito
- `/carts/:cid` → Visualización del carrito con productos poblados
- `/realtimeproducts` → Productos en tiempo real con WebSocket

---

## 📷 Captura de pantalla (opcional)

Puedes incluir una imagen de tu interfaz en esta sección.

---

## ✅ Estado del proyecto

- ✔️ Funcionalidad completa implementada
- ✔️ Validación de productos y carritos
- ✔️ MongoDB como persistencia
- ✔️ WebSockets activos
- ✔️ Listo para entrega académica final

---

## ✍️ Autor

**Elkin Gonzalez**  
Repositorio: [github.com/elkindgonzalez/websockets-handlebars](https://github.com/elkindgonzalez/websockets-handlebars)
