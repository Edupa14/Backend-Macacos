const express = require('express');
const app = express();

const {list, registrar,editar,editEstado,listId,envioCorreo,envioCorreoLiquidacion} = require("../controllers/notificacion.controller");

app.post("/notificacion/listar", list);
app.post("/notificacion/envioCorreo", envioCorreo);
app.post("/notificacion/envioCorreoLiquidacion", envioCorreoLiquidacion);
app.post("/notificacion/registrar", registrar);
app.put("/notificacion/actualizar", editar);
app.delete("/notificacion/eliminar/:idNotificacion", editEstado);
app.get("/notificacion/id/:idNotificacion", listId);
module.exports = app;