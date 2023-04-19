const express = require('express');

const userController = require('../controllers/users.controller');

//Importacion de Middlewares
const userMiddleware = require('../middlewares/user.middleware');
const validationUserMiddleware = require('../middlewares/validationUser.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const routerUser = express.Router();

routerUser.post(
  '/',
  validationUserMiddleware.createUserValidation,
  userController.createUser
);

routerUser.post(
  '/login',
  validationUserMiddleware.loginUser,
  userController.loginUser
);

routerUser.use(authMiddleware.protect);

routerUser.route('/').get(userController.findAll);

routerUser
  .route('/:id')
  .all(userMiddleware.validExistUser)
  .get(userController.userById)
  .patch(
    authMiddleware.protectAccountOwner,
    validationUserMiddleware.updateUser,
    userController.upDateUser
  )
  .delete(
    authMiddleware.protectAccountOwner,
    userController.deleteUser
  );

module.exports = routerUser;
