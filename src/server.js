// src/server.js
import app from './app.js';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://andressanchez447:jbvXmn9QWK3DDiOS@cluster0.6u1ge.mongodb.net/')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar a MongoDB', err));
