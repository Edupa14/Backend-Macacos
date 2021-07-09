const express = require('express');
const app = express();

const {registrar, listLog } = require("../controllers/log.controller");

app.post("/log/crear", registrar);
app.post("/log/listar/fecha", listLog)
module.exports = app;