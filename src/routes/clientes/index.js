const { Router } = require('express');
const controladorcliente = require('../../controllers/controlClientes');
const controladorAutenticacion= require('../../controllers/controladorAutenticacion');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorcliente.ListaClientes);
//router.post('/', controladorcliente.guardar);

router.post('/guardar',
    body('nombre').isLength({min:3}).withMessage('La longitud minima del nombre es de 3 caracteres'),
    body('apellido').isLength({min:3}).withMessage('La longitud minima del apellido es de 3 caracteres'),
    body('genero').isLength({max:1}).withMessage('La longitud maxima del genero debe ser de uno'),
    body('correo').isEmail().withMessage('Debe tener un formato de correo electronico'),
    controladorcliente.guardar);

router.put('/modificar',
    //controladorAutenticacion.validarAutenticado,
    param('id').isEmpty().withMessage('No se permiten campos vacios').not().isInt().withMessage('El Id debe ser un numero entero'),
    body('nombre').isLength({min:3}).withMessage('La longitud minima del nombre es de 3 caracteres'),
    body('apellido').isLength({min:3}).withMessage('La longitud minima del apellido es de 3 caracteres'),
    body('fechanac').isDate({format: 'YYYY-MM-DD'}).withMessage('Debe tener un formato de fecha'),
    body('genero').isLength({max:1}).withMessage('La longitud maxima del genero es de uno'),
    body('correo').isEmail().withMessage('Debe tener un formato de correo electronico'),
    controladorcliente.Actualizarquery);

router.delete('/eliminar',
    controladorcliente.eliminarQuery);

//router.delete('/:id', controladorcliente.eliminarParamns);
//router.put('/', controladorcliente.Actualizarquery);





module.exports = router;