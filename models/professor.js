// npm install express sequelize sqlite3 sequelize-cli body-parser

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Professor = sequelize.define('Professor', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Professor;
