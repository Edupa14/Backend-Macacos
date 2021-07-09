const express = require('express');
const app = express();

const { registrar, list, update, editEstado, listTodo } = require("../controllers/tercero.controller");

app.post("/tercero/crear", registrar);
app.get("/tercero/id/:idTercero", list);
app.put("/tercero/actualizar", update);
app.delete("/tercero/eliminar/:idTercero", editEstado);
app.post("/tercero/listar", listTodo);  

module.exports = app; 