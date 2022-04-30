const sequelize = require('sequelize');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    "usuarios", {
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
        usuario: {
            type: sequelize.STRING(45),
            allowNull: false,
            unique: {
                msg: 'El usuario necesita ser unico'
            }
        },
        contrasena: {
            type: sequelize.STRING(250),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese la contraseña'
                }
            }
        },
        tipo: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el tipo'
                }
            }
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: {
                    msg: 'Ingrese el estado'
                }
            }
        },
    }, {
        tableName: "usuarios",
        timestamps: false,
        hooks: {
            beforeCreate(usuarios) {
                const hash = bcrypt.hashSync(usuarios.contrasena, 10);
                usuarios.contrasena = hash;
            },
            beforeUpdate(usuarios) {
                const hash = bcrypt.hashSync(usuarios.contrasena, 10);
                usuarios.contrasena = hash;
            }
        },
    },
);
Usuario.prototype.verificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
}
module.exports = Usuario;