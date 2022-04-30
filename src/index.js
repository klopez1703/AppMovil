const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
app.set('port', 3101);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
require("dotenv").config();

app.listen(3101, () => {
    console.log('Servidor iniciado en el puerto 3101');
});

//rutas
//app.use('/api/',require('./index'));
app.use('/api/usuarios/', require('./routes/usuarios'));
app.use('/usuario/img', express.static(path.join(__dirname, '../src/public/img')));
app.use('/api/Archivos/', require('./routes/archivos'));
app.use('/api/Factura/', require('./routes/Factura'));
app.use('/api/marcas/', require('./routes/marcas'));
app.use('/api/productos/', require('./routes/productos'));
app.use('/api/clientes/', require('./routes/clientes'));
app.use('/api/empleados/', require('./routes/empleados'));
app.use('/api/autenticacion', require('./routes/autenticacion'));
app.use('/api/temporal', require('./routes/temporal'));