const { Router } = require('express');
const controladorproducto = require('../../controllers/controladorproducto');
const controladorAutenticacion= require('../../controllers/controladorAutenticacion');
const {body, param} = require('express-validator');

const router = Router();

router.get('/', controladorproducto.listaProducto);
//router.post('/', controladorproducto.guardar);

//router.delete('/:id', controladorproducto.eliminarParams);
//router.put('/', controladorproducto.actualizarQuery);

router.post('/guardar',
    
    controladorproducto.guardar);

router.put('/modificar', 
    param('idMarca').isEmpty().withMessage('No se permiten campos vacios')
    .not().isInt().withMessage('El ID debe ser un numero entero'),
    body('descripcion').isLength({min:10}).withMessage('La longitud minima de la descripcion es de 10 caracteres'),
    body('precio').isDecimal().withMessage('El campo solo acepta numeros decimales'),
    body('existencia').isInt().withMessage('El campo solo permite numeros enteros'),
    controladorproducto.actualizarQuery);

router.delete('/eliminar', controladorproducto.eliminarQuery);

module.exports = router;