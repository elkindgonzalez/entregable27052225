# 🛍️ WebSockets + Handlebars + MongoDB

Este proyecto es una API y vista fullstack construida con Node.js, Express, MongoDB Atlas, WebSockets y Handlebars. Cumple con todos los requisitos de la **entrega final del curso de backend**.

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
├── models/             # Schemas Mongoose
├── public/             # JS frontend
├── routes/             # API y vistas
├── sockets/            # WebSocket config
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

Crea un archivo `.env`:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/websocketsDB
```

---

## ⚙️ Ejecutar el proyecto

```bash
npm run dev
```

Servidor en: [http://localhost:8080](http://localhost:8080)

---

## 📡 WebSockets en acción

- Ruta `/realtimeproducts` con un formulario para agregar y eliminar productos en tiempo real.
- WebSocket mantiene sincronizadas todas las vistas abiertas.

---

## 🛒 Endpoints REST principales

### Productos `/api/products`
- `GET /` → Listado paginado, filtrado, ordenado
- `POST /` → Crear producto
- `DELETE /:id` → Eliminar producto

### Carritos `/api/carts`
- `POST /` → Crear carrito
- `GET /:cid` → Ver carrito (populate)
- `POST /:cid/products/:pid` → Agregar producto
- `PUT /:cid` → Reemplazar productos
- `PUT /:cid/products/:pid` → Cambiar cantidad
- `DELETE /:cid/products/:pid` → Quitar producto
- `DELETE /:cid` → Vaciar carrito

---

## 👀 Vistas dinámicas

- `/products` → Paginación + filtros + ordenamiento
- `/carts/:cid` → Carrito con productos (populate)
- `/realtimeproducts` → WebSocket + formulario dinámico

---

## 📷 Captura de pantalla (opcional)

Agregá una imagen de la interfaz si lo deseás.

---

## ✍️ Autor

**Elkin Gonzalez**  
Repositorio: [github.com/elkindgonzalez/websockets-handlebars](https://github.com/elkindgonzalez/websockets-handlebars)

---