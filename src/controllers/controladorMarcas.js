const Marcas = require('../models/modeloMarcas');
const { validationResult } = require('express-validator');
const moment = require('moment');
exports.listaMarcas = async(req, res) => {
    try {
        const marcas = await Marcas.findAll();
        console.log(marcas);
        res.json(marcas);
    } catch {
        res.send("Ocurrio a un error en el servidor");

    }


};


exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { NombreMarca } = req.body;

        if (!NombreMarca) {
            res.send("No se ingreso la marca");
            console.log(NombreMarca);
        } else {
            var nuevomarca = await Marcas.create({
                NombreMarca
            }).then((data) => {
                console.log(data);
                res.send("Registro guardado");
            }).catch((error) => {
                if (error) {
                    console.log(error);
                    res.send("Erro al guardar los datos");
                }

            });
            console.log(NombreMarca);
            res.send("Marca registrada");

        }
    }

};


exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto";
    } else {
        const buscarMarca = await Marcas.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarMarca) {
            mensaje = "El id no existe";
        } else {
            await Marcas.destroy({
                where: {
                    id: id,
                }
            }).then((data) => {
                console.log(data);
                mensaje = "Marca Eliminada";
            }).catch((error) => {
                console.log(error);
                mensaje = "Error en el servidor";
            });
        }
    }
    res.send(mensaje);
};


exports.actualizarQuery = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { id } = req.query;
        const { NombreMarca } = req.body;
        console.log(req.body);
        var mensaje = "";
        if (!id) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            if (!NombreMarca) {
                mensaje = "Debe enviar el nombre de la marca";
            } else {
                var buscarMarca = await Marcas.findOne({
                    where: {
                        id: id,
                    }
                });
                if (!buscarMarca) {
                    mensaje = "El id no existe";
                } else {
                    buscarMarca.NombreMarca = NombreMarca;
                    await buscarMarca.save();
                    mensaje = "Registro actualizado";
                }
            }

        }
        res.send(mensaje);
    }


};