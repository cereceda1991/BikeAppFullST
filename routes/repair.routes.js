const express = require('express');
const routerRepair = express.Router();

//Importación de Controladores
const repairController = require('../controllers/repair.controller');

//Importación de Middlewares
const validationRepairMidleware = require('../middlewares/validationRepair.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');

// Aplicar el middleware de autenticación a todas las rutas
routerRepair.use(
  authMiddleware.protect,
  authMiddleware.restrictTo('employee')
);

routerRepair
  .route('/')
  .get(repairController.allRepair)
  .post(
    validationRepairMidleware.createRepairValidation,
    repairController.createRepair
  );

routerRepair
  .route('/:id')
  .all(repairMiddleware.validExistRepair)
  .get(repairController.repairById)
  .patch(repairController.repairUpDate)
  .delete(repairController.deleteRepair);

module.exports = routerRepair;
