const { Router } = require('express');
const controladorTemporal = require('../../controllers/controladorTemporal');
const {body, param} = require('express-validator');
const router = Router();

router.get('/sumar', controladorTemporal.Sumar);

router.delete('/borrarnull', controladorTemporal.BorrarIdfacturaNull);

router.get('/mostrar', controladorTemporal.ListaTemporalCompleto);

router.get('/', controladorTemporal.ListaTemporal);

router.post('/guardar', 
    controladorTemporal.guardar);

    router.put('/modificartodo', 
    controladorTemporal.ActualizarqueryTodo);

router.put('/modificar', 
    controladorTemporal.Actualizarquery);

router.delete('/eliminar', 
    controladorTemporal.eliminarQuery);

module.exports = router;