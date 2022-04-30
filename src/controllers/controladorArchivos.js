const fs = require('fs');
const msj = require('../components/mensaje');
const path = require('path');
const ModeloCliente = require('../models/modeloClientes');
exports.Recibir = async(req, res) => {
    const { filename } = req.file;
    const { id } = req.body;
    console.log(filename);
    console.log(id);
    var BuscarCliente = await ModeloCliente.findOne({
        where: {
            id: id
        }
    });
    if (!BuscarCliente) {
        msj("El cliente no existe", 200, [], res);
    } else {
        const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img' + BuscarCliente.imagen));
        if (!buscarImagen) {
            console.log("La imagen no existe");
        } else {
            try {
                fs.unlinkSync(path.join(__dirname, '../public/img' + BuscarCliente.imagen));
                console.log("Imagen eliminada");
            } catch (error) {
                console.log(error);
                console.log("No se elimino la imagen");
            }
        }
        BuscarCliente.imagen = filename;
        await BuscarCliente.save()
            .then((data) => {
                //console.log(data);
                msj("Archivo Alamacenado", 200, [], res);
            })
            .catch((error) => {
                console.log(error);
                msj("Error al guardar la imagen", 200, [], res);
            });

    }

}