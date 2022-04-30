const Clientes = require('../models/modeloEmpleados');

exports.ListaClientes = async(req, res) => {
    const clientes = await Clientes.findAll();
    console.log(clientes);
    res.json(clientes);
};

exports.guardar = async(req, res) => {
    const { nombre, apellido, fechanac, genero, correo, idusuario } = req.body;
    //var mensaje = "";
    if (!nombre || !apellido || !fechanac || !genero || !correo || !idusuario) {
        console.log("Llene todos los datos");
    } else var nuevocliente = await Clientes.create({
        nombre: nombre,
        apellido: apellido,
        fechanac: fechanac,
        genero: genero,
        correo: correo,
        idusuario: idusuario,
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
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        const buscarClientes = await Clientes.findOne({
            where: {
                id: id,
            }
        });
        if (!buscarClientes) {
            mensaje = "El id no existe";
        } else {
            await Clientes.destroy({
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


exports.eliminarquery = (req, res) => {
    console.log(req.query);
    const { id } = req.query;
    var mensaje = "";
    console.log(id);
    if (id == 1) {
        mensaje = "Registro eliminado";
    } else {
        mensaje = "El codigo del cliente no existe";
    }
    res.send(mensaje);
};

exports.Actualizarquery = async(req, res) => {
    const { id } = req.query;
    const { nombre, apellido, fechanac, genero, correo, idusuario } = req.body;
    var mensaje = "";
    if (!id) {
        mensaje = "El id no debe contener valores nulos o no esta enviendo el parametro correcto"
    } else {
        if (!nombre || !apellido || !fechanac || !genero || !correo || !idusuario) {
            mensaje = "Debe enviar los datos completos";
        } else {
            var buscarClientes = await Clientes.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscarClientes) {
                mensaje = "El id no existe";
            } else {
                buscarClientes.nombre = nombre;
                buscarClientes.apellido = apellido;
                buscarClientes.fechanac = fechanac;
                buscarClientes.genero = genero;
                buscarClientes.correo = correo;
                buscarClientes.idusuario = idusuario;
                await buscarClientes.save();
                mensaje = "Registro actualizado";
            }
        }

    }
    res.send(mensaje);
};