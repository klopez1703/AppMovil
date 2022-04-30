const { Router } = require('express');
const controladorcliente = require('../../Controllers/controladorEmpleados');
const router = Router();
router.get('/', controladorcliente.ListaClientes);
router.post('/guardar', controladorcliente.guardar);

router.delete('/eliminar', controladorcliente.eliminarQuery);
router.put('/modificar', controladorcliente.Actualizarquery);





module.exports = router;