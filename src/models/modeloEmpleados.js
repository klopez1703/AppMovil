const sequelize = require('sequelize');
const db = require('../config/db');
const Clientes = db.define(
    "empleados", {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: sequelize.STRING(250),
            allowNull: false,
        },
        apellido: {
            type: sequelize.STRING(250),
            allowNull: false,
        },
        fechanac: {
            type: sequelize.DATE,
            allowNull: false,
        },
        genero: {
            type: sequelize.ENUM('M', 'F'),
            allowNull: false,
        },
        correo: {
            type: sequelize.STRING(100),
            allowNull: false,
        },
        imagen:{
            type: sequelize.STRING(250),
        },
        idusuario: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "empleados",
        timestamps: false,
    }
);
module.exports = Clientes;