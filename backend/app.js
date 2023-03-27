const express = require('express');
const cors = require('cors'); // Importamos el paquete CORS

const routerUser = require('./routes/userRoutes.route');
const routerRepair = require('./routes/repairRoutes.route');

const app = express(); // Creamos una nueva instancia de Express

app.use(express.json()); // Añadimos el middleware para procesar datos en formato JSON

// Configuramos el middleware CORS para permitir solicitudes desde http://localhost:5173
app.use(
  cors({ origin: 'http://localhost:5173' })
);

// Añadimos las rutas de usuarios y reparaciones
app.use('/api/v1/repairs', routerRepair);
app.use('/api/v1/users', routerUser);

module.exports = app; // Exportamos la aplicación para ser usada en el archivo server.js
