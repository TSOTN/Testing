# Imagen oficial de Node
FROM node:20

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json
COPY package.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto
EXPOSE 3000

# Arrancar el servidor
CMD ["npm", "start"]
