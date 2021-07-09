const express = require('express');
const app = express();

const {actualizar, listBanco, crear, deleteBanco} = require("../controllers/banco.controller");

app.post("/banco/edit", actualizar);
app.post("/banco/listar", listBanco);
app.post("/banco/crear", crear);
app.delete("/banco/eliminar/:idCtaBan", deleteBanco);
module.exports = app;
