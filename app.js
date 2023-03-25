const express = require("express");

const routerUser=require('./routes/userRoutes.routes')
const routerRepair=require('./routes/repairRoutes.routes')

const app= express()

app.use(express.json());

app.use('/api/v1/repairs',routerRepair)
app.use("/api/v1/users",routerUser)

module.exports=app;