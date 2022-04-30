const sequelize = require('sequelize');
const db = new sequelize(

    'movilcomputadoras', //nombre base de datos
    'klopez', //usaurio de la base de datos de mysql
    'Diosesamor17.', {
        host: '192.168.0.11',
        dialect: 'mysql',
        port: '3306',
    }
);

module.exports = db;