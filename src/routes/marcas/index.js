const { Router } = require('express');
const controladormarcas = require('../../controllers/controladorMarcas');
const controladorAutenticacion= require('../../controllers/controladorAutenticacion');
const {body, param} = require('express-validator');

const router = Router();

router.get('/', controladormarcas.listaMarcas);
//router.post('/', controladormarcas.guardar);

//router.delete('/:id', controladormarcas.eliminarParams);
//router.put('/', controladormarcas.actualizarQuery);

router.post('/guardar',
    controladormarcas.guardar);

router.put('/modificar',
    controladormarcas.actualizarQuery);    

router.delete('/eliminar',controladormarcas.eliminarQuery);

module.exports = router;