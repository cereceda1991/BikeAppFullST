const express = require('express');

const userController = require('../controllers/users.controller');
const validExistUser = require('../middlewares/user.middleware');
const validFieldUser = require('../middlewares/validationUser.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const routerUser = express.Router();

routerUser.post(
  '/',
  validFieldUser.createUserValidation,
  userController.createUser
);

routerUser.post(
  '/login',
  validFieldUser.loginUser,
  userController.loginUser
);

routerUser.use(authMiddleware.protect);

routerUser.route('/').get(userController.findAll);

routerUser
  .route('/:id')
  .get(
    validExistUser.validExistUser,
    userController.userById
  )
  .patch(
    validExistUser.validExistUser,
    authMiddleware.protectAccountOwner,
    validFieldUser.updateUser,
    userController.upDateUser
  )
  .delete(
    validExistUser.validExistUser,
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = routerUser;
