const express = require('express');

const repairController = require('../controllers/repair.controller');
const repairMiddleware = require('../middlewares/repair.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const routerRepair = express.Router();

routerRepair.use(
  authMiddleware.protect,
  authMiddleware.restrictTo('employee')
);

routerRepair
  .route('/')
  .get(repairController.allRepair)
  .post(
    validationMiddleware.createRepairValidation,
    userMiddleware.validExistUserbyId,
    repairController.createRepair
  );

routerRepair
  .route('/:id')
  .get(
    repairMiddleware.validateRepairStatus,
    repairController.repairById
  )
  .patch(
    repairMiddleware.validExistRepair,
    repairController.repairUpDate
  )
  .delete(
    repairMiddleware.validExistRepair,
    repairController.deleteRepair
  );

module.exports = routerRepair;
