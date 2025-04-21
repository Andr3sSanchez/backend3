# 🐾 AdoptMe API

**AdoptMe** es una API RESTful construida con Node.js, Express y MongoDB que permite gestionar usuarios, mascotas, adopciones y sesiones. El proyecto incluye documentación Swagger, testing automatizado con Mocha, Chai y Supertest, y está dockerizado para facilitar su despliegue.

---

## 🚀 Tecnologías usadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Mocha + Chai + Supertest
- Docker + DockerHub
- Swagger (OpenAPI)
- Multer (para carga de archivos)
- bcrypt (para encriptación de contraseñas)

---

## 📁 Estructura del proyecto

src/ │ ├── app.js ├── dao/ # Modelos con Mongoose ├── routes/ # Routers por módulo ├── controllers/ # Lógica de cada endpoint ├── services/ # (Si aplica) ├── middlewares/ ├── utils/ └── docs/ # Documentación Swagger (YAML) test/ # Tests con Mocha, Chai, Supertest


---

## 📌 Funcionalidades principales

- Registro y login de usuarios
- Gestión de mascotas (CRUD)
- Adopciones
- Subida de documentos por usuario
- Control de sesión y `last_connection`
- Mocking de datos (`/api/mocks`)
- Tests funcionales
- Dockerización

---

## 🧪 Cómo correr los tests

1. Asegurate de tener las dependencias instaladas:
   ```bash
   npm install

Ejecutá los tests:
npm test

📚 Documentación Swagger
La documentación está disponible en:
👉 http://localhost:8080/api/docs

Los archivos YAML están en:
📁 src/docs/

🐳 Docker
1. Crear la imagen

docker build -t adoptme-api .

2. Correr el contenedor

docker run -p 8080:8080 adoptme-api

La API estará disponible en:
👉 http://localhost:8080

3. Imagen en DockerHub
👉 https://hub.docker.com/r/andressanch/adoptme-api

📦 Endpoints principales
🧑‍🤝‍🧑 Usuarios
POST /api/sessions/register

POST /api/sessions/login

GET /api/users

GET /api/users/:uid

PUT /api/users/:uid

DELETE /api/users/:uid

POST /api/users/:uid/documents (subida de archivos)

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

El sistema actualiza el last_connection del usuario al hacer login/logout.

Los documentos se suben a la carpeta /documents, y las imágenes de mascotas a /pets.

🛠 Cómo contribuir
Forkeá el repositorio

Creá una branch (git checkout -b feature/nueva-feature)

Commit (git commit -m 'Agrega nueva feature')

Push (git push origin feature/nueva-feature)

Pull Request 🙌

🧑‍💻 Autor
Hecho con 💙 por [Andres Sanchez]
GitHub: https://github.com/Andr3sSanchez
DockerHub: https://hub.docker.com/u/andressanch