const express = require('express');
const app = express();

const { getListaParametros, getListaParametrosAut, postParametroCrea, setActualizarParametro, setParametroEliminar, listarParametroXid, listarParametroEtiqueta } = require("../controllers/parametro.controller");

app.post("/parametro/listar/", getListaParametros);
app.post("/parametro/listar/valores", getListaParametrosAut);
app.post("/parametro/crear", postParametroCrea);
app.put("/parametro/actualizar", setActualizarParametro);
app.delete("/parametro/eliminar/:idParametro", setParametroEliminar);
app.get("/parametro/listar/id/:idParametro", listarParametroXid);
app.get("/parametro/listar/etiquetas/", listarParametroEtiqueta);

module.exports = app; 