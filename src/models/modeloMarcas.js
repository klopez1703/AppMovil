const sequelize = require('sequelize');
const db = require('../config/db');
const Marcas = db.define(
    "marcas", {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                is: {
                    args: [/^[0-9]+$/],
                    msg: "ID del tipo invalido."
                }
            },
        },
        NombreMarca: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el nombre'
                }
            }
        }
    }, {
        tableName: "marcas",
        timestamps: false,

    }
);

module.exports = Marcas;