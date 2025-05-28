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

---

## 🛠 Tecnologías

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
   PORT=8080
   ```
2. Ajusta valores según tu entorno.

---

## 📦 Scripts disponibles

| Script        | Descripción                        |
| ------------- | ---------------------------------- |
| `npm run dev` | Inicia servidor con Nodemon        |
| `npm start`   | Inicia servidor en producción      |
| `npm test`    | Ejecuta tests con Jest (si aplica) |

---

## 📁 Estructura

```bash
src/
├── config/        # Configuración (logger, etc.)
├── controllers/   # Lógica de controladores
├── dao/           # Modelos Mongoose y DAOs
├── middlewares/   # Middlewares (auth, validation)
├── routes/        # Rutas Express
├── services/      # Lógica de negocio
├── utils/         # Utilidades y helpers
└── index.js       # Punto de entrada
```

---

## 🚀 Endpoints

### 📌 Autenticación

| Método | Ruta                    | Descripción                  |
| ------ | ----------------------- | ---------------------------- |
| `POST` | `/api/users`            | Registro público de usuarios |
| `POST` | `/api/sessions/login`   | Login: recibe email y pass   |
| `GET`  | `/api/sessions/current` | Info del usuario autenticado |

### 👥 Usuarios (Admin)

| Método   | Ruta              | Descripción            |
| -------- | ----------------- | ---------------------- |
| `GET`    | `/api/users`      | Listar usuarios        |
| `GET`    | `/api/users/:uid` | Obtener usuario por ID |
| `PUT`    | `/api/users/:uid` | Actualizar usuario     |
| `DELETE` | `/api/users/:uid` | Eliminar usuario       |

---

## 💬 WebSockets

* Conectar cliente: `<script>const socket = io();</script>`
* Eventos:

  * 🔹 `addProduct` ➔ agrega producto
  * 🔹 `updateProduct` ➔ actualiza producto
  * 🔹 `deleteProduct` ➔ elimina producto
  * 🔹 `productList` ➔ emite lista actualizada

---

## ✅ Funcionalidades implementadas

* ✔️ **Modelo User**: `first_name`, `last_name`, `email` (único), `age`, `password` (hash), `cart`, `role`.
* ✔️ **Encriptación**: bcrypt.
* ✔️ **Passport**: Local & JWT.
* ✔️ **Validaciones**: Joi.
* ✔️ **Protección**: `authJWT` + `authorize('admin')`.
* ✔️ **CRUD Usuarios**.
* ✔️ **WebSockets**: productos en tiempo real.

---

## ✨ Mejoras sugeridas

* 🧪 **Tests**: Jest + Supertest con MongoDB en memoria.
* 🛡 **Errores & Logs**: Middleware global + Winston/Pino.
* ⚡ **Optimización BD**: Índices, paginación, proyecciones.
* 📧 **Extras**: Verificación de email, recuperación de contraseña.
* 📁 **Uploads**: Multer o Cloudinary.

---

## 🤝 Contribuciones

1. Haz **fork** del repositorio
2. Crea una rama: `git checkout -b feature/nombre`
3. Haz tus cambios y **commit**: `git commit -m "Agrega nueva funcionalidad"`
4. Haz **push**: `git push origin feature/nombre`
5. Abre un **Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la **MIT License**. Para más detalles:
[MIT](https://opensource.org/licenses/MIT)
