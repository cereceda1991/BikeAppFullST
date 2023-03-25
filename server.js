const app=require('./app')
const { db } = require('./database/config');

//AUTENTICACION DE LA BASE DE DATOS
db.authenticate()
  .then(() =>
    console.log('database authenticate')
  )
  .catch((err) => console.log(err));

//SINCRONIZACION CON LA BASE DE DATOS
db.sync({force:true})
  .then(() => console.log('database sync'))
  .catch((err) => console.log(err));
const port=3000

app.listen(port,()=>{
    console.log(`este es el puerto ${port}`);
})