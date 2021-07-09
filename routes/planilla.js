const express = require('express');
const app = express();

const { listar,obtener, reprocesar} = require("../controllers/planilla.controller");

app.post("/planilla/listar/", listar);
app.post("/planilla/obtener/", obtener);
app.post("/planilla/reprocesar/", reprocesar);


module.exports = app;