const { Router } = require('express');
const controladorUsuario = require('../../controllers/controlUsuario');
const controladorAutenticacion= require('../../controllers/controladorAutenticacion');
const {body, param} = require('express-validator');
const router = Router();

router.get('/', controladorUsuario.ListaUsuarios);
//router.post('/', controladorUsuario.guardar);
//router.delete('/:id', controladorUsuario.eliminarParamns);
//router.put('/', controladorUsuario.Actualizarquery);

router.get('/maximo',
controladorUsuario.UsuarioMaximo
);

router.post('/guardar', 
    body('usuario').isLength({min:4, max:16}).withMessage('La longitud max-min del usuario es de [4 a 16] caracteres'),
    body('contrasena').isLength({min:6}).withMessage('La longitud minima del nombre es de 6 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    body('tipo').isLength().withMessage('El campo solo acepta caracteres'),
    body('estado').isBoolean().withMessage('El estado debe ser un numero entero'), 
    controladorUsuario.guardar);

router.put('/modificar', 
    body('usuario').isLength({min:4, max:16}).withMessage('La longitud max-min del usuario es de [4 a 16] caracteres'),
    body('contrasena').isLength({min:6}).withMessage('La longitud minima del nombre es de 6 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    controladorUsuario.Actualizarquery);

/*router.put('/modificar/contrasena',
    controladorAutenticacion.validarAutenticado,
    param('id').isEmpty().withMessage('No se permiten campos vacios')
    .not().isInt().withMessage('El Id debe ser un numero entero'),
    body('contrasenaAnterior').isLength({min:6}).withMessage('La longitud minima del nombre es de 6 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    body('contrasenaNueva').isLength({min:6}).withMessage('La longitud minima del nombre es de 6 caracteres')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    controladorUsuario.ModificarContrasena
    );*/

router.delete('/eliminar', controladorUsuario.eliminarQuery);

module.exports = router;