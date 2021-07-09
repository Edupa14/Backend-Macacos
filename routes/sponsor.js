const express = require('express');
const app = express();

const { listadoSponsor,deleteProveedorId,registrarSponsor, listadoSponsorXId, listadoSponsorXruc, listadoConfig, update, listadoSponsorPrograma } = require("../controllers/sponsor.controller");

app.post("/sponsors/proveedores/", listadoSponsor); 
app.post("/sponsors/proveedores/id", listadoSponsorXId); 
app.get("/sponsors/ruc/:ruc", listadoSponsorXruc);
app.post("/sponsors/listConfig/", listadoConfig);
app.post("/sponsors/listPrograma/", listadoSponsorPrograma);
app.post("/sponsors/config/", update)
app.delete("/sponsors/proveedores/estado/:idSponsor", deleteProveedorId); 
app.post("/sponsor/tercero/crear", registrarSponsor); 


module.exports = app  