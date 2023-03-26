const express = require('express');

const repairController = require('../controllers/repair.controller');

const routerRepair = express.Router();

routerRepair
  .route('/')
  .get(repairController.allRepairs)
  .post(repairController.createRepair);

routerRepair
  .route('/:id')
  .get(repairController.repairById)
  .patch(repairController.updateRepair)
  .delete(repairController.deleteRepair);

module.exports = routerRepair;
