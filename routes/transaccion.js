const express = require('express');
const app = express();

const { procesarPlanilla, subirArchivo, ObtenerPlanilla, ListarTransaccion, ObtenerRuc} = require("../controllers/transaccion.controller");

app.post("/procesar/planilla", procesarPlanilla);
app.post("/subir/archivo/planilla", subirArchivo);
app.post("/planilla/consultar", ObtenerPlanilla);
app.post("/transaccion/buscar/filtro", ListarTransaccion);
app.get("/transaccion/buscar-ruc/:idSponsor", ObtenerRuc);

module.exports = app;