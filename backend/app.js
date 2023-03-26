const express = require("express");

const routerUser=require('./routes/userRoutes.route')
const routerRepair=require('./routes/repairRoutes.route')

const app= express()

app.use(express.json());

app.use('/api/v1/repairs',routerRepair)
app.use("/api/v1/users",routerUser)

module.exports=app;