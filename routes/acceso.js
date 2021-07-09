const express = require('express');
const app = express();


const { list, registrar,listRol, updateAcceso, setAccesoEliminar} = require("../controllers/acceso.controller");

app.get("/acceso/Usuario/id/:idUsuario", list);
app.post("/acceso/registrar", registrar);
app.get("/acceso/id/:codRol", listRol);
app.delete("/acceso/eliminar/codRol/:codRol", setAccesoEliminar);
app.put("/acceso/actualizar", updateAcceso);

module.exports = app;
