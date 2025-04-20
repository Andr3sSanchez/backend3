# Usa Node como base
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que uses en tu app
EXPOSE 8080

# Comando para ejecutar la app
CMD ["npm", "start"]
