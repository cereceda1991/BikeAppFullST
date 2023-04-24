const express = require('express');

const userController = require('../controllers/users.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const routerUser = express.Router();

routerUser.post(
  '/',
  validationMiddleware.createUserValidation,
  userController.createUser
);

routerUser.post(
  '/login',
  userController.loginUser
);

routerUser.use(authMiddleware.protect);

routerUser.get('/', userController.findAll);

routerUser
  .route('/:id')
  .get(
    userMiddleware.validIfExistUser,
    userController.userById
  )
  .patch(
    validationMiddleware.updateUserValidation,
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner,
    userController.upDateUser
  )
  .delete(
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = routerUser;
