const ModeloUsuario = require('../models/modeloUsuario');
const ModeloCliente = require('../models/modeloClientes');
const ModeloEmpleado = require('../models/modeloEmpleados');
const {validationResult} = require('express-validator');
const moment =require('moment');
const msj = require('../components/mensaje');
const passport = require('../config/passport');
const { Op } = require("sequelize");
const EnviarCorreo = require('../config/correo');
exports.validarAutenticado = passport.validarAutenticado;

exports.recuperarContrasena = async(req, res, next) => {
    const { correo } = req.body;
    console.log(correo);
    var busCliente = await ModeloCliente.findOne({
        where: {
            correo: correo,
        }
    });
    var busUsuario = await ModeloUsuario.findOne({
        where: {
            id: busCliente.idusuario,
        }
    });
    const ncontrasena = 'Nuevacontra123';
    if (busCliente) {
        busUsuario.contrasena = ncontrasena;
        await busUsuario.save();
        const data = {
            correo: busCliente.correo,
            contrasena: ncontrasena,
        }
        EnviarCorreo.recuperarContrasena(data);
        msj("Correo Enviado", 200, [], res);
    } else {
        msj("Los datos ingresados no son validos", 200, [], res);
    }
};



exports.incioSesion = async (req, res, next)=> {

    const validacion={usuario, contrasena}=req.body;
    if (!usuario || !contrasena)
    {
        res.send("Debe llenar todos los campos");
    }
    else
    {
        const BuscarUsuario = await ModeloUsuario.findOne({
            where:{
                [Op.and]:[
                    {usuario: usuario},
                    {estado: true},
                ],
            }
        });
        if(!BuscarUsuario || !BuscarUsuario.verificarContrasena(contrasena, BuscarUsuario.contrasena))
        {
            res.send("El usuario no existe o la contraseña esta incorrecta");
        }
        else
        {
            const tipo = BuscarUsuario.tipo;
            if(tipo=="cliente")
            {
                var BuscarCliente = await ModeloCliente.findOne({
                    where:{
                        idusuario: BuscarUsuario.id
                    }
                })

                var cli = {
                    id: BuscarCliente.id,
                    nombre: BuscarCliente.nombre,
                    apellido: BuscarCliente.apellido,
                    fechanac: BuscarCliente.fechanac,
                    genero: BuscarCliente.genero,
                    correo: BuscarCliente.correo,
                    imagen: BuscarCliente.imagen
                };
            }
            else if(tipo=="admin")
            {
                var BuscarEmpleado = await ModeloEmpleado.findOne({
                    where:{
                        idusuario: BuscarUsuario.id
                    }
                })

                var cli = {
                    id: BuscarEmpleado.id,
                    nombre: BuscarEmpleado.nombre,
                    apellido: BuscarEmpleado.apellido,
                    fechanac: BuscarEmpleado.fechanac,
                    genero: BuscarEmpleado.genero,
                    correo: BuscarEmpleado.correo,
                    imagen: BuscarEmpleado.imagen
                };
            }
            const token = passport.getToken({id: BuscarUsuario.id});
            var data = null;
            if(tipo=="cliente")
            {
                data = {
                    token: token,
                    cliente: cli
                };
            }
            else if(tipo=="admin")
            {
                data = {
                    token: token,
                    admin: cli
                };
            }
            
            console.log(token);
            msj("Bienvenido, " + cli.nombre + " " + cli.apellido, 200, data, res);
        }
    }
};
exports.ValidarToken = async (req, res)=> {
    const { data }= req.body;
    msj("Token invalido", 200, data, res);
};
exports.enviarToken = async (req, res)=> {
    const { data }= req.body;
    res.status(200).json(data);
};