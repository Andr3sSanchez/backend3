import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import errorHandler from './utils/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';
import __dirname from './utils/index.js';

const app = express();



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));


const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Adoptme API',
        version: '1.0.0',
        description: 'API para gestión de usuarios, mascotas, sesiones y adopciones',
      },
      servers: [
        {
          url: 'http://localhost:8080/api/',
          description: 'Servidor local',
        },
      ],
    },
    apis: ['./src/docs/*.yaml'], // Archivos donde se escribirán los comentarios Swagger
  }

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);



  export default app;
