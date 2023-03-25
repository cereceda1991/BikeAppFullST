const express =require('express')

const userController=require('../controllers/user.controller')

const routerUsers=express.Router()

routerUsers
.route('/')
.get(userController.findAll)
.post(userController.createUser)

routerUsers
.route('/:id')
.get(userController.userById)
.patch(userController.upDateUser)
.delete(userController.deleteUser)

module.exports= routerUsers