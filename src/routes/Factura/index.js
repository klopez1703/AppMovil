const { Router } = require('express');
const controladorFactura = require('../../controllers/controladorFactura');
const controladorAutenticacion= require('../../controllers/controladorAutenticacion');
const {body, param} = require('express-validator');

const router = Router();

router.get('/', controladorFactura.listaFactura);
//router.post('/', controladorFactura.guardar);

//router.delete('/:id', controladorFactura.eliminarParams);
//router.put('/', controladorFactura.actualizarQuery);


router.post('/guardar',
   /* body('fecha').isDate({format: 'DD-MM-YYYY'}).withMessage('Debe tener formato de fecha'),
    body('direccion').isLength({min:10}).withMessage('La longitud minima de la dirección es de 10 caracteres'),
    body('estadoEntrega').isBoolean().withMessage('El estado debe ser un numero entero'),
    body('subtotal').isDecimal().withMessage('El campo solo acepta numeros decimales'),
    body('impuesto').isFloat().withMessage('El campo solo acepta numeros decimales'),
    body('descuento').isFloat().withMessage('El campo solo acepta numeros decimales'),*/
    controladorFactura.guardar);

router.put('/modificar',
    /*param('idfactura').isEmpty().withMessage('No se permiten campos vacios')
    .not().isInt().withMessage('El ID debe ser un numero entero'),
    body('fecha').isDate({format: 'YYYY-MM-DD'}).withMessage('Debe tener formato de fecha'),
    body('direccion').isLength({min:10}).withMessage('La longitud minima de la dirección es de 10 caracteres'),
    body('estadoEntrega').isBoolean().withMessage('El estado debe ser un numero entero'),
    body('subtotal').isDecimal().withMessage('El campo solo acepta numeros decimales'),
    body('descuento').isFloat().withMessage('El campo solo acepta numeros decimales'),*/
    controladorFactura.actualizarQuery);

router.delete('/eliminar', 
    controladorFactura.eliminarQuery
    );

module.exports = router;