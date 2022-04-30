const Temporal = require('../models/modeloTemporal');
const Factura = require('../models/modeloFactura');
const { validationResult } = require('express-validator');
const moment = require('moment');

exports.Sumar = async(req, res) => {
    
    const Suma = await Temporal.sum('cantidadXprecio',{
        where:{
            idfactura: null
        }
    });
    console.log(Suma);
    res.json(Suma);

};


exports.ListaTemporalCompleto = async(req, res) => {
    try {
        const buscarTemporal = await Temporal.findAll();
        console.log(buscarTemporal);
        res.json(buscarTemporal);
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};



exports.ListaTemporal = async(req, res) => {
    try {
        const buscarTemporal = await Temporal.findAll({
            where:{
                
                idfactura: null,
                
            }
        });
        console.log(buscarTemporal);
        res.json(buscarTemporal);
    } catch {
        res.send("Ocurrio un error en el servidor");
    }

};
exports.BorrarIdfacturaNull = async(req, res) => {
    
    const Borrar = await Temporal.destroy({
        where:{
            idfactura: null
        }
    });
    res.send('Registros Borrados');
};
exports.guardar = async(req, res) => {
    const { descripcion_producto, cantidad, estado, precio, cantidadXprecio, idfactura } = req.body;
    //var mensaje = "";
    if (!descripcion_producto || !cantidad || !estado == null || !precio || !cantidadXprecio) {
        console.log("Llene todos los datos");
    } else var nuevotemporal = await Temporal.create({
        descripcion_producto: descripcion_producto,
        cantidad: cantidad,
        estado: estado,
        precio: precio,
        cantidadXprecio: cantidadXprecio,
        idfactura: idfactura,
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
    res.send("Registro guardado");

};

exports.eliminarQuery = async(req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    console.log(id);
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarTemporal = await Temporal.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarTemporal) {
            mensaje = "El id no existe";
        } else {
            await Temporal.destroy({
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


exports.ActualizarqueryTodo = async(req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.send("Los datos ingresados no son validos");
    } else {
        const { id } = req.query;
        const { descripcion_producto, cantidad, estado, precio, cantidadXprecio, idfactura } = req.body;
        console.log(req.body);
        var mensaje = "";
        if (!id) {
            mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
        } else {
            if (!descripcion_producto || !cantidad || estado==null || !precio || !cantidadXprecio || !idfactura) {
                mensaje = "Debe enviar los datos completos";
            } else {
                var buscarTemporal = await Temporal.findOne({
                    where: {
                        id: id,
                    }
                });
                if (!buscarTemporal) {
                    mensaje = "El id no existe";
                } else {
                    var buscarFactura = await Factura.findOne({
                        where: {
                            id: idfactura
                        }
                    });
                    if (!buscarFactura) {
                        mensaje = "El id de factura no existe";
                    } else {
                        buscarTemporal.descripcion_producto = descripcion_producto;
                        buscarTemporal.cantidad = cantidad;
                        buscarTemporal.estado = estado;
                        buscarTemporal.precio = precio;
                        buscarTemporal.cantidadXprecio = cantidadXprecio;
                        buscarTemporal.idfactura = idfactura;
                        await buscarTemporal.save();
                        mensaje = "Registro actualizado";
                    }


                }
            }

        }
        res.send(mensaje);
    }

       
    
};


exports.Actualizarquery = async(req, res) => {

    var BuscarFactura = await Factura.max('id',{});

    console.log(BuscarFactura);

    var id = BuscarFactura;

    await Temporal.update({ idfactura: id }, { where: { idfactura: null } });
    res.send("Actualiado");
       
    
};


/*
exports.Actualizarquery = async(req, res) => {
            var buscarTemporal = await Temporal.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscarTemporal) {
                mensaje = "El id no existe";
            } else {
                buscarTemporal.idfactura = idfactura;
                await buscarTemporal.save();
                mensaje = "Registro actualizado";
            }
        }
        res.send(mensaje);
    }
};
*/