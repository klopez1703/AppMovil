const sequelize = require('sequelize');
const db = require('../config/db');
const Temporal = db.define(
    "temporal", {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        descripcion_producto: {
            type: sequelize.STRING(250),
            allowNull: false,
        },
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
        },
        precio: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        cantidadXprecio: {
            type: sequelize.DOUBLE,
            allowNull: false,
        },
        idfactura: {
            type: sequelize.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: "temporal",
        timestamps: false,

    }
);

module.exports = Temporal;