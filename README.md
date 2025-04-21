# 🐾 AdoptMe API

**AdoptMe** es una API RESTful construida con Node.js, Express y MongoDB que permite gestionar usuarios, mascotas, adopciones y sesiones. El proyecto incluye documentación Swagger, testing automatizado con Mocha, Chai y Supertest, y está dockerizado para facilitar su despliegue.

---

## 🚀 Tecnologías usadas

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Mocha + Chai + Supertest** (Testing automatizado)
- **Docker + DockerHub**
- **Swagger (OpenAPI)** (Documentación interactiva)
- **Multer** (Para carga de archivos)
- **bcrypt** (Para encriptación de contraseñas)
- **Winston** (Para logging)

---

## 📁 Estructura del proyecto

```bash
src/
├── app.js           # Configuración y rutas
├── dao/             # Modelos con Mongoose
├── routes/          # Routers por módulo
├── controllers/     # Lógica de cada endpoint
├── services/        # Servicios (si aplica)
├── middlewares/     # Middlewares
├── utils/           # Funciones utilitarias
├── docs/            # Documentación Swagger (YAML)
test/                # Tests con Mocha, Chai y Supertest

📌 Funcionalidades principales
Registro y login de usuarios

Gestión de mascotas (CRUD)

Adopciones (CRUD)

Subida de documentos por usuario

Control de sesión y last_connection

Mocking de datos (/api/mocks)

Tests funcionales (Mocha, Chai, Supertest)

Dockerización para facilitar despliegues

🧪 Cómo correr los tests
Asegúrate de tener las dependencias instaladas:

npm install

Ejecuta los tests:

npm test

📚 Documentación Swagger
La documentación está disponible en:

👉 http://localhost:8080/api/docs

Los archivos YAML están en:

📁 src/docs/

🐳 Docker
Crear la imagen

docker build -t adoptme-api .

Correr el contenedor

docker run -p 8080:8080 adoptme-api

La API estará disponible en:

👉 http://localhost:8080

Imagen en DockerHub
👉 https://hub.docker.com/r/andressanch/adoptme-api

📦 Endpoints principales
🧑‍🤝‍🧑 Usuarios
POST /api/sessions/register

POST /api/sessions/login

GET /api/users

GET /api/users/:uid

PUT /api/users/:uid

DELETE /api/users/:uid

POST /api/users/:uid/documents (Subida de archivos)

🐶 Mascotas
POST /api/pets

GET /api/pets

GET /api/pets/:pid

PUT /api/pets/:pid

DELETE /api/pets/:pid

🐾 Adopciones
POST /api/adoptions/:uid/:pid

GET /api/adoptions

GET /api/adoptions/:aid

🧪 Mocking
GET /api/mocks/mockingusers

POST /api/mocks/generateData?users=10&pets=10

📌 Consideraciones
Todas las contraseñas están encriptadas con bcrypt.

El sistema actualiza el campo last_connection del usuario al hacer login/logout.

Los documentos de usuario se suben a la carpeta /documents y las imágenes de mascotas a /pets.

🛠 Cómo contribuir
Forkea el repositorio.

Crea una nueva branch:
git checkout -b feature/nueva-feature

Haz tus cambios.

Haz commit:
git commit -m 'Agrega nueva feature'

Empuja la branch:
git push origin feature/nueva-feature

Crea un Pull Request 🙌

🧑‍💻 Autor
Hecho con 💙 por [Andres Sanchez]
GitHub: https://github.com/Andr3sSanchez
DockerHub: https://hub.docker.com/u/andressanch