const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('userexpense', {
    userid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
  });
  
  module.exports = User;