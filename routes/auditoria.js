const express = require('express');
const app = express();

const {registrar, list} = require("../controllers/auditoria.controller");

app.post("/auditoria/crear", registrar);
app.post("/auditoria/listar/fecha/", list)
module.exports = app;