const {DataTypes}=require('sequelize');
const {db}=require('../database/config');

const Repair=db.define(repairs,{
id:{
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,
    type:DataTypes.STRING
},

date:{
    type:DataTypes.DATE,
    allowNull:false,
},

status:{
    types:DataTypes.ENUM('pending','cancelled','completed'),
    defaultValue:''
},

userId:{
type:DataTypes.INTEGER,
allowNull:false,
}
});

module.export= Repair;