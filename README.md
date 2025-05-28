🛍️ Ecommerce-Auth API · WebSockets • Handlebars • MongoDB • JWT
Aplicación full-stack construida con Node.js + Express que integra:

Persistencia en MongoDB Atlas (Mongoose)

Vistas dinámicas con Express-Handlebars

Actualizaciones en tiempo real mediante Socket.IO

CRUD de usuarios con contraseñas cifradas (bcryptjs)

Autenticación y autorización con Passport (Local + JWT)

CRUD de productos y carritos con paginación

🚀 Tecnologías utilizadas
Ámbito	Paquetes / Herramientas
Servidor	express · dotenv · nodemon
Persistencia	mongoose · mongoose-paginate-v2
Seguridad	passport · passport-local · passport-jwt · bcryptjs · jsonwebtoken
Tiempo real	socket.io
Plantillas	express-handlebars

📁 Estructura del proyecto
bash
Copiar
Editar
src/
├─ config/          # Conexión MongoDB + configuración Passport
├─ controllers/     # Lógica de negocio (users, sessions, products, carts)
├─ dao/
│  └─ models/       # Esquemas Mongoose (User, Product, Cart)
├─ routes/
│  ├─ api/          # Endpoints REST (/products /carts /users /sessions)
│  └─ views/        # Rutas para vistas Handlebars
├─ sockets/         # WebSocket handlers
├─ utils/           # Helpers hash / compare password
├─ views/           # Plantillas .handlebars
└─ index.js         # Servidor HTTP + WebSocket
📦 Instalación
bash
Copiar
Editar
git clone https://github.com/elkindgonzalez/entregable27052225.git
cd entregable27052225
npm install
Crear un archivo .env con:

ini
Copiar
Editar
PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/ecommerce
JWT_SECRET=clave_ultra_secreta
▶️ Ejecución
bash
Copiar
Editar
npm run dev
Servidor en http://localhost:8080

🔐 Autenticación y autorización
Endpoint	Método	Descripción	Acceso
/api/users	POST	Registro de usuario (password hash)	Público
/api/sessions/login	POST	Login (Passport Local) → devuelve JWT	Público
/api/sessions/current	GET	Datos del usuario autenticado (JWT)	Header Authorization: Bearer <token>

El JWT incluye sub (ID) y role; expira en 2 h.

🔌 Endpoints REST (resumen)
Productos /api/products
GET / • GET /:pid • POST / • PUT /:pid • DELETE /:pid

Carritos /api/carts
POST / • GET /:cid • PUT /:cid • DELETE /:cid
POST /:cid/products/:pid • PUT /:cid/products/:pid • DELETE /:cid/products/:pid

Usuarios /api/users (rol admin)
GET / • GET /:uid • PUT /:uid • DELETE /:uid

🌐 Vistas Handlebars
Ruta	Descripción
/products	Lista paginada con botón «Agregar al carrito»
/carts/:cid	Detalle de carrito con productos poblados
/realtimeproducts	Alta/baja de productos en tiempo real (WebSocket)

📡 WebSockets en acción
Vista /realtimeproducts con formulario para agregar y eliminar productos.

Las actualizaciones se transmiten en tiempo real a todos los clientes mediante Socket.IO.

🧪 Prueba rápida
bash
Copiar
Editar
# 1 – Registrar usuario
curl -X POST http://localhost:8080/api/users \
 -H 'Content-Type: application/json' \
 -d '{"first_name":"Ana","last_name":"Lopez","email":"ana@test.com","age":30,"password":"1234"}'

# 2 – Login
TOKEN=$(curl -s -X POST http://localhost:8080/api/sessions/login \
 -H 'Content-Type: application/json' \
 -d '{"email":"ana@test.com","password":"1234"}' | jq -r .token)

# 3 – Ruta protegida
curl http://localhost:8080/api/sessions/current \
 -H "Authorization: Bearer $TOKEN"
✅ Estado del proyecto
CRUD de productos y carritos ✔️

CRUD de usuarios con contraseñas cifradas ✔️

Passport Local + JWT ✔️

Middleware de roles ✔️

WebSockets y vistas activas ✔️

Listo para entrega académica final ✔️

✍️ Autor
Elkin González
https://github.com/elkindgonzalez/entregable27052225