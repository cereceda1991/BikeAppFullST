const express =require('express');

const repairController=require('./../controllers/repair.controller')

const routerRepair=express.Router();

routerRepair
.route('/')
.get(repairController.allRepair)
.post(repairController.createRepair);

routerRepair
.route('/:id')
.get(repairController.repairById)
.patch(repairController.repairUpDate)
.delete(repairController.repairDelete);

module.exports= routerRepair;