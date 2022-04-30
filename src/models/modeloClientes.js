const sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Clientes = db.define(
    "clientes", {
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
            }
        },
        nombre: {
            type: sequelize.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el nombre'
                }
            }
        },
        apellido: {
            type: sequelize.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el apellido'
                }
            }
        },
        fechanac: {
            type: sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la fecha'
                }
            }
        },
        genero: {
            type: sequelize.ENUM('M', 'F'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el Genero'
                }
            }
        },
        correo: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: {
                msg: 'El email necesita ser unico'
            },
            validate: {
                isEmail: {
                    msg: 'Email no valido'
                },
                notEmpty: {
                    msg: 'Ingrese un email'
                }
            }
        },
        imagen:{
            type: sequelize.STRING(250),
        },
        idusuario: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: "clientes",
        timestamps: false,
    }
);
module.exports = Clientes;