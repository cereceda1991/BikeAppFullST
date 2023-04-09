const express = require('express');

const userController = require('../controllers/user.controller');
const {
  handleCreateUserErrors,
  handleDeleteUserErrors,
  handleUpDateUserErrors,
  handleUserByIdErrors,
} = require('../middlewares/user.middleware');
const {
  createUserValidation,
  updateUserValidation,
} = require('../middlewares/validation.middleware');

const routerUsers = express.Router();

routerUsers
  .route('/')
  .get(userController.findAll)
  .post(
    createUserValidation,
    handleCreateUserErrors,
    userController.createUser
  );

routerUsers
  .route('/:id')
  .get(
    handleUserByIdErrors,
    userController.userById
  )
  .patch(
    updateUserValidation,
    handleUpDateUserErrors,
    userController.upDateUser
  )
  .delete(
    handleDeleteUserErrors,
    userController.deleteUser
  );

module.exports = routerUsers;
