const express = require('express');
const app = express();
// const { Personas } = require('../json/data.json');

const { obtenerRespuesta } = require("../controllers/hola.controller");



app.get("/Hola", obtenerRespuesta);

module.exports = app;