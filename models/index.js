const Sequelize = require('sequelize');
const sequelize = new Sequelize('forsico_email_service', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

const EmailLog = require('./emailLog')(sequelize, Sequelize.DataTypes);

const db = {
    sequelize,
    Sequelize,
    EmailLog
};

module.exports = db;
