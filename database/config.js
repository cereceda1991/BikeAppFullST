const {Sequelize}=require('sequelize')

const db=new Sequelize({
dialect:'postgres',
host:'localhost',
username:'postgres',
pasword:'1234',
database:'reapirdb',
port:'5432',
logging:false,
});

module.exports={db}