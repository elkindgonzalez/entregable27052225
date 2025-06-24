# 🚀 API Backend de Ecommerce con Node.js, Express, MongoDB, Handlebars y Socket.IO

---

## 📋 Tabla de contenidos

* [📖 Descripción](#-descripción)
* [🛠 Tecnologías](#-tecnologías)
* [⚙️ Instalación](#️-instalación)
* [🔧 Configuración](#-configuración)
* [📦 Scripts disponibles](#-scripts-disponibles)
* [📁 Estructura](#-estructura)
* [🚀 Endpoints](#-endpoints)
* [💬 WebSockets](#-websockets)
* [✅ Funcionalidades implementadas](#-funcionalidades-implementadas)
* [✨ Mejoras sugeridas](#-mejoras-sugeridas)
* [🤝 Contribuciones](#-contribuciones)
* [📄 Licencia](#-licencia)

---

## 📖 Descripción

Este proyecto es un **API Backend** para un Ecommerce, que incluye:

* 🔐 Autenticación y autorización de usuarios con Passport (Local + JWT).
* 📋 CRUD completo de usuarios con roles y permisos.
* 🔍 Validaciones de entrada con Joi.
* 🗄 Persistencia en MongoDB usando Mongoose.
* 🔄 Comunicación en tiempo real de productos con Socket.IO.
* 🖥 Renderizado de vistas con Handlebars (opcional para front-end).
* ✉️ Recuperación de contraseña vía correo electrónico con token de expiración.
* 🛡️ Middleware de autorización por roles (`user`, `admin`).
* 🧠 Arquitectura profesional con patrón Repository, DAOs y DTOs.

---

## 🛠 Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Passport (Local + JWT)
- Socket.IO
- Handlebars
- Nodemailer
- Joi
- bcrypt
- dotenv

---

## ⚙️ Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/elkindgonzalez/entregable27052225.git
   cd entregable27052225
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

---

## 🔧 Configuración

1. Crear un archivo `.env` con:

   ```ini
   MONGO_URI=<tu_mongodb_uri>
   JWT_SECRET=<tu_secreto_jwt>
   CLIENT_URL=http://localhost:3000
   PORT=8080
   ```

---

## 📦 Scripts disponibles

| Script        | Descripción                        |
| ------------- | ---------------------------------- |
| `npm run dev` | Inicia servidor con Nodemon        |
| `npm start`   | Inicia servidor en producción      |

---

## 📁 Estructura

```bash
src/
├── config/        # Configuración de Passport y BD
├── controllers/   # Lógica de endpoints
├── dao/           # Modelos Mongoose, DAOs y FS fallback
├── dto/           # Data Transfer Objects
├── middlewares/   # authJWT, authorize, validators
├── repositories/  # Patron Repository
├── routes/        # API routes
├── services/      # Lógica de negocio
├── sockets/       # Websockets
├── utils/         # Helpers: mailer, crypto, etc
└── views/         # Handlebars
```

---

## 🚀 Endpoints

### 📌 Autenticación

| Método | Ruta                          | Descripción                             |
| ------ | ----------------------------- | --------------------------------------- |
| POST   | `/api/sessions/login`         | Inicia sesión y genera JWT              |
| GET    | `/api/sessions/current`       | Devuelve usuario autenticado (DTO)      |
| POST   | `/api/sessions/forgot-password` | Enviar link de recuperación de contraseña |
| POST   | `/api/sessions/reset-password`  | Cambiar contraseña con token            |

### 👤 Usuarios

| Método   | Ruta              | Rol requerido | Descripción            |
| -------- | ----------------- | ------------- | ---------------------- |
| GET      | `/api/users`      | admin         | Listar usuarios        |
| GET      | `/api/users/:uid` | admin         | Obtener usuario por ID |
| PUT      | `/api/users/:uid` | admin         | Actualizar usuario     |
| DELETE   | `/api/users/:uid` | admin         | Eliminar usuario       |

### 📦 Productos

| Método   | Ruta                | Rol requerido | Descripción                      |
| -------- | ------------------- | ------------- | -------------------------------- |
| GET      | `/api/products`     | público       | Listar productos con filtros     |
| GET      | `/api/products/:id` | público       | Obtener producto por ID          |
| POST     | `/api/products`     | admin         | Crear nuevo producto             |
| PUT      | `/api/products/:id` | admin         | Actualizar producto              |
| DELETE   | `/api/products/:id` | admin         | Eliminar producto                |

### 🛒 Carritos

| Método   | Ruta                                        | Rol requerido | Descripción                          |
| -------- | ------------------------------------------- | ------------- | ------------------------------------ |
| GET      | `/api/carts/:cid`                           | user          | Ver carrito con productos            |
| POST     | `/api/carts`                                | user          | Crear nuevo carrito vacío            |
| POST     | `/api/carts/:cid/products/:pid`             | user          | Agregar producto al carrito          |
| PUT      | `/api/carts/:cid/products/:pid`             | user          | Modificar cantidad de un producto    |
| PUT      | `/api/carts/:cid`                           | user          | Reemplazar productos del carrito     |
| DELETE   | `/api/carts/:cid/products/:pid`             | user          | Eliminar producto específico         |
| DELETE   | `/api/carts/:cid`                           | user          | Vaciar el carrito                    |

---

## 💬 WebSockets

Conexión:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

Eventos:

- `addProduct`
- `updateProduct`
- `deleteProduct`
- `productList`

---

## ✅ Funcionalidades implementadas

- ✔ Autenticación con JWT
- ✔ Recuperación de contraseña con expiración
- ✔ Middleware `authorize` por roles
- ✔ Uso de DTO para proteger datos sensibles
- ✔ Patrón Repository implementado en usuarios
- ✔ CRUD completo de productos y carritos
- ✔ Comunicación en tiempo real con Socket.IO
- ✔ Rutas protegidas por roles
- ✔ Estructura de proyecto profesional y modular

---

## ✨ Mejoras sugeridas

- 🔒 2FA o verificación de email
- 📊 Dashboard de administración
- 🧪 Tests automatizados con Jest y MongoDB Memory
- 📦 Subida de archivos con Multer
- 🧩 API REST bien documentada con Swagger
- 📬 Notificaciones por correo

---

## 🤝 Contribuciones

1. Haz **fork** del repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz tus cambios y `git commit -m "Agrega funcionalidad"`
4. `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la **MIT License**. Para más detalles, consulta [MIT](https://opensource.org/licenses/MIT).
