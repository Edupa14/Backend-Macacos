const express = require('express');
const app = express();

const { guardarConfiguracionProducto, actualizarValor, listarValores, listarValoresINA } = require("../controllers/valor.controller");

app.post("/valor/registro/array", guardarConfiguracionProducto);
app.post("/valor/actualizar", actualizarValor);
app.get("/valor/listar/codVal/:codVal", listarValores);
app.get("/valor/listarInhabilitados/codVal/:codVal", listarValoresINA);

module.exports = app;