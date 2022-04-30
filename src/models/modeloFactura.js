const sequelize = require('sequelize');
const db = require('../config/db');
const Factura = db.define(
    "factura", {
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
        fecha: {
            type: sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la fecha'
                }
            }
        },
        direccion: {
            type: sequelize.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la direccion'
                }
            }
        },
        idcliente: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el id del cliente'
                }
            }
        },
        estadoEntrega: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        subtotal: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el subtotal'
                }
            }
        },
        impuesto: {
            type: sequelize.ENUM('15%', '18%'),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el impuesto'
                }
            }
        },
        descuento: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el descuento'
                }
            }
        },
    }, {
        tableName: "factura",
        timestamps: false,

    }
);

module.exports = Factura;