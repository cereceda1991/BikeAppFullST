const express = require('express');

const repairController = require('../controllers/repair.controller');
const {
  handleRepairByIdErrors,
  handleUpdateRepairErrors,
  handleDeleteRepairErrors,
  handleCreateRepairError,
} = require('../middlewares/repair.middleware');
const {
  createRepairValidation,
} = require('../middlewares/validation.middleware');

const routerRepair = express.Router();

routerRepair
  .route('/')
  .get(repairController.allRepairs)
  .post(
    createRepairValidation,
    handleCreateRepairError,
    repairController.createRepair
  );

routerRepair
  .route('/:id')
  .get(
    handleRepairByIdErrors,
    repairController.repairById
  )
  .patch(
    handleUpdateRepairErrors,
    repairController.updateRepair
  )
  .delete(
    handleDeleteRepairErrors,
    repairController.deleteRepair
  );

module.exports = routerRepair;
