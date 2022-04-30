const sequelize = require('sequelize');
const db = require('../config/db');
const Productos = db.define(
    "productos", {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            
        },
        descripcion: {
            type: sequelize.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el nombre'
                }
            }
        },
        precio: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el precio'
                }
            }
        },
        existencia: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la existencia'
                }
            }
        },
        idMarca: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la marca'
                }
            }
        }
    }, {
        tableName: "productos",
        timestamps: false,

    }
);
module.exports = Productos;