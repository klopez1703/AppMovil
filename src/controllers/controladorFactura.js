const Factura = require('../Models/modeloFactura');
const Cliente = require('../models/modeloClientes');
const { validationResult } = require('express-validator');
const moment = require('moment');
exports.listaFactura = async(req, res) => {    
    
    try {
        const factura = await Factura.findAll();
        console.log(factura);
        res.json(factura);
    } catch {
        res.send("Ocurrio a un error en el servidor");
    }

};
exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { fecha, direccion, idcliente, estadoEntrega, subtotal, impuesto, descuento } = req.body;

        const cliente = await Cliente.findOne({
            where: {
                id: idcliente
            }
        });
        if (!cliente) {
            res.send("El id del cliente no existe");
        } else {

            var nuevafactura = await Factura.create({
                fecha: fecha,
                direccion: direccion,
                idcliente: idcliente,
                estadoEntrega: estadoEntrega,
                subtotal: subtotal,
                impuesto: impuesto,
                descuento: descuento,
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

};

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarFactura = await Factura.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarFactura) {
            mensaje = "El id cliente no existe";
        } else {
            await Factura.destroy({
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
        const { fecha, direccion, idcliente, estadoEntrega, subtotal, impuesto, descuento } = req.body;
        console.log(req.body);
        var mensaje = "";
        if (!id) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            if (!fecha || !direccion || !idcliente || estadoEntrega == null || !subtotal || !impuesto || descuento == null) {
                mensaje = "Debe enviar los datos completos";
            } else {
                var buscarCliente = await Cliente.findOne({
                    where: {
                        id: idcliente,
                    }
                });
                if (!buscarCliente) {
                    mensaje = "El id del cliente no existe";
                } else {
                    var buscarFactura = await Factura.findOne({
                        where: {
                            id: id
                        }
                    });
                    if (!buscarFactura) {
                        mensaje = "El id de factura no existe";
                    } else {
                        buscarFactura.fecha = fecha;
                        buscarFactura.direccion = direccion;
                        buscarFactura.idcliente = idcliente;
                        buscarFactura.estadoEntrega = estadoEntrega;
                        buscarFactura.subtotal = subtotal;
                        buscarFactura.impuesto = impuesto;
                        buscarFactura.descuento = descuento;
                        await buscarFactura.save();
                        mensaje = "Registro actualizado";
                    }


                }
            }

        }
        res.send(mensaje);
    }

};