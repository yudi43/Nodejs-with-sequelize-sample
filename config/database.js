const Sequelize = require('sequelize');

module.exports = new Sequelize('codinggig', 'yudi', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
