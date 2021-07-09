const express = require('express');
const app = express();

//app.use(require('./hola.js'))
app.use(require('./usuario.js'))
app.use(require('./transaccion.js'))
app.use(require('./parametro.js'))
app.use(require('./tercero.js'))
app.use(require('./acceso.js'))
app.use(require('./log.js'))
app.use(require('./valor.js'))
app.use(require('./auditoria.js'))
app.use(require('./notificacion.js'))
app.use(require('./sponsor.js'))
app.use(require('./liquidacion.js'))
app.use(require('./planilla.js'))
app.use(require('./banco.js'))


module.exports = app;