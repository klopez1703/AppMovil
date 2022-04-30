const Producto = require('../models/modeloProductos');
const Marca = require('../models/modeloMarcas');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.listaProducto = async(req, res) => {
    try {

        const producto = await Producto.findAll();
        console.log(producto);
        res.json(producto);

    } catch {
        res.send("Ocurrio a un error en el servidor");
    }
};
exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos")
    } else {
        const { descripcion, precio, existencia, idMarca } = req.body;

        const marca = await Marca.findOne({
            where: {
                id: idMarca
            }
        });
        if (!marca) {
            res.send("La marca del producto no existe");
        } else {

            const producto = await Producto.findOne({
                where: {
                    descripcion: descripcion
                }
            });
            if (producto) {
                res.send("El nombre del producto ya existe");
            } else {
                var nuevoproducto = await Producto.create({
                    descripcion: descripcion,
                    precio: precio,
                    existencia: existencia,
                    idMarca: idMarca,
                }).then((data) => {
                    console.log(data);
                    res.send("Registro Guardado");
                }).catch((error) => {
                    if (error) {
                        console.log(error);
                        res.send("Error al guardar los datos");
                    }
                });
            }


        }

    }

};

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarProducto = await Producto.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarProducto) {
            mensaje = "El id de producto no existe";
        } else {
            await Producto.destroy({
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

exports.actualizarQuery = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { id } = req.query;
        const { descripcion, precio, existencia, idMarca } = req.body;
        console.log(req.body);
        var mensaje = "";
        if (!id) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {

            var buscarMarca = await Marca.findOne({
                where: {
                    id: idMarca,
                }
            });
            if (!buscarMarca) {
                mensaje = "El id de la marca no existe";
            } else {
                var buscarProduto = await Producto.findOne({
                    where: {
                        id: id
                    }
                });
                if (!buscarProduto) {
                    mensaje = "El id del producto no existe";
                } else {
                    buscarProduto.descripcion = descripcion;
                    buscarProduto.precio = precio;
                    buscarProduto.existencia = existencia;
                    buscarProduto.idMarca = idMarca;
                    await buscarProduto.save();
                    mensaje = "Registro actualizado";
                }


            }


        }
        res.send(mensaje);
    }

};