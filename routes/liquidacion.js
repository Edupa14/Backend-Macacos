const express = require('express');
const app = express();

const { simulacion,update } = require("../controllers/liquidacion.controller");

app.post("/liquidacion/simulacion/", simulacion);
app.post("/liquidacion/editar/", update);


module.exports = app;