const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'pending',
      'completed',
      'cancelled'
    ),
    defaultValue: 'pending',
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Repair;
