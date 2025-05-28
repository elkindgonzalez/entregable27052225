API Backend de Ecommerce con Node.js, Express, MongoDB, Handlebars y Socket.IO

Proyecto backend con Node.js, Express, MongoDB, Handlebars y Socket.IO para la gestión de usuarios y productos en tiempo real.

Tabla de contenidos

Descripción

Tecnologías

Instalación

Configuración

Scripts disponibles

Estructura del proyecto

Endpoints

WebSockets

Funcionalidades implementadas

Mejoras sugeridas

Contribuciones

Licencia

Descripción

Este proyecto implementa un servidor backend que proporciona:

Autenticación y autorización de usuarios con Passport (Local + JWT).

CRUD completo de usuarios con roles y permisos.

Validaciones de entrada con Joi.

Persistencia en MongoDB usando Mongoose.

Comunicación en tiempo real de productos con Socket.IO.

Renderizado de vistas con Handlebars (opcional para front-end).

Tecnologías

Node.js

Express

MongoDB & Mongoose

Passport.js (Local, JWT)

Bcrypt

Joi

Socket.IO

Handlebars

Nodemon

Instalación

Clonar el repositorio:

git clone <repo-url>
cd entregable27052225

Instalar dependencias:

npm install

Configuración

Crear un archivo .env en la raíz con las siguientes variables:

MONGO_URI=<tu_uri_mongodb>
JWT_SECRET=<tu_secreto_jwt>
PORT=8080

Ajustar valores según tu entorno.

Scripts disponibles

En el package.json encontrarás:

npm run dev – Inicia el servidor en modo desarrollo con Nodemon.

npm start – Inicia el servidor en modo producción.

npm test – Ejecuta tests con Jest y Supertest (si se implementa).

Estructura del proyecto

src/
├── config/       # Configuraciones (e.g., logger)
├── controllers/  # Lógica de controladores
├── dao/          # Data access objects y modelos Mongoose
├── middlewares/  # Middlewares (auth, validation, errors)
├── routes/       # Definición de rutas
├── services/     # Lógica de negocio adicional
├── utils/        # Utilidades y helpers
└── index.js      # Punto de entrada

Endpoints

Autenticación

POST /api/users – Registro de usuario (público). Validaciones aplicadas.

POST /api/sessions/login – Login: recibe email y password, devuelve JWT.

GET /api/sessions/current – Obtiene info del usuario autenticado (JWT).

Usuarios (admin)

GET /api/users – Listar todos los usuarios.

GET /api/users/:uid – Obtener usuario por ID.

PUT /api/users/:uid – Actualizar usuario.

DELETE /api/users/:uid – Eliminar usuario.

WebSockets

Conexión en cliente: io.connect('<server>').

Eventos disponibles:

addProduct: envía datos para agregar nuevo producto.

updateProduct: envía cambios de producto existente.

deleteProduct: envía ID para eliminar producto.

productList: el servidor emite lista actualizada a todos.

Funcionalidades implementadas

✔️ Modelo User con campos: first_name, last_name, email (único), age, password (hash), cart (ref), role (user por defecto).

✔️ Encriptación de contraseñas con bcrypt.

✔️ Passport Local y JWT para autenticación.

✔️ Rutas protegidas con middlewares authJWT y authorize('admin').

✔️ CRUD completo de usuarios.

✔️ Validaciones de entrada usando Joi.

✔️ WebSockets para productos en tiempo real.

Mejoras sugeridas

Tests automáticos

Configurar Jest + Supertest con MongoDB en memoria.

Manejo centralizado de errores

Middleware global y logging con Winston o Pino.

Optimización de MongoDB

Índices, paginación, proyecciones.

Funcionalidades adicionales

Verificación de email y recuperación de contraseña.

Upload de archivos con Multer o Cloudinary.

Gestión avanzada de roles y permisos.

Contribuciones

Fork del repositorio

Crear una rama: git checkout -b feature/nueva-funcionalidad

Commit de tus cambios: git commit -m 'Agrega nueva funcionalidad'

Push a la rama: git push origin feature/nueva-funcionalidad

Abrir Pull Request

Licencia

Este proyecto está bajo la licencia MIT. Esto significa:

Permites usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software.

El software se proporciona "tal cual", sin garantía de ningún tipo. Ni los autores ni los titulares del copyright pueden ser responsables de reclamos, daños u otras responsabilidades.

Debes incluir el aviso de copyright y la licencia en todas las copias o partes sustanciales del software.

Para más detalles, consulta el texto completo de la licencia: https://opensource.org/licenses/MIT.
