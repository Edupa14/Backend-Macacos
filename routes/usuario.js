const express = require('express');
const app = express();

const { logueo, registrar, list, update, editEstado, deleteUsuario, listTodo, actualizarContrasenia } = require("../controllers/usuario.controller");

app.post("/usuarios/login", logueo);
app.post("/usuarios/crear", registrar);
app.get("/usuario/id/:idUsuario", list);
app.put("/usuario/actualizar", update);
app.post("/usuario/eliminar", editEstado);
app.delete("/usuario/tercero/eliminar/:idUsuario", deleteUsuario);
app.get("/usuario/listar", listTodo);
app.put("/usuario/actualizar/contrasenia", actualizarContrasenia);



module.exports = app;