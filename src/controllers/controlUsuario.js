const Usuario = require('../models/modeloUsuario');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.ListaUsuarios = async(req, res) => {
    try {
        const usuario = await Usuario.findAll();
        console.log(usuario);
        res.json(usuario);
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};


exports.UsuarioMaximo = async(req, res) => {

    var BuscarUsuario = await Usuario.max('id',{});

    console.log(BuscarUsuario);

    res.json(BuscarUsuario);

};


exports.guardar = async(req, res) => {
    const { usuario, contrasena, tipo, estado } = req.body;
    //var mensaje = "";
    if (!usuario || !contrasena || !tipo || estado == null) {
        console.log("Llene todos los datos");
    } else var nuevousuario = await Usuario.create({
        usuario: usuario,
        contrasena: contrasena,
        tipo: tipo,
        estado: estado
    }).then((data) =>

        {
            console.log(data);
            res.send("Registro guardado");
        }).catch((error) =>

        {
            if (error) {
                console.log(error);
                res.send("Error al guardar los datos");
            }

        });

    console.log(usuario);
    res.send("Registro guardado");

};

/*exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { usuario, contrasena, tipo, estado } = req.body;
        const buscarUsuario = await ModeloUsuario.findOne({
            where: {
                usuario: usuario
            }
        });
        if (buscarUsuario) {
            res.send("El usuario ya existe");
        } else {
            var nuevousuario = await Usuario.create({
                usuario: usuario,
                contrasena: contrasena,
                tipo: tipo,
                estado: estado
            }).then((data) => {
                console.log(data);
                res.send("Registro guardado");
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    res.send("Error al guardar los datos");
                }
            });

            console.log(usuario);
            res.send("Registro guardado");
        }
    }

};*/

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarUsuario = await Usuario.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarUsuario) {
            mensaje = "El id no existe";
        } else {
            await Usuario.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                console.log(data);
                mensaje = "Registro Eliminado";
            }).catch((error) => {
                console.log(error);
                mensaje = "Error en el servidor";
            });
        }
    }
    res.send(mensaje);
};

exports.Actualizarquery = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { id } = req.query;
        const { usuario, contrasena, tipo, estado } = req.body;
        var mensaje = "";
        if (!id) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            var buscarUsuario = await Usuario.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscarUsuario) {
                mensaje = "El id no existe";
            } else {
                buscarUsuario.usuario = usuario;
                buscarUsuario.contrasena = contrasena;
                buscarUsuario.tipo = tipo;
                buscarUsuario.estado = estado;
                await buscarUsuario.save();
                mensaje = "Registro actualizado";
            }
        }
        res.send(mensaje);
    }
};