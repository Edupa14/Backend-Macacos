const { SqlConnection, sql } = require('../conexion/conexion');

async function obtenerRespuesta() {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        const {recordset:resultado} = request.execute('getRespuesta');

        return resultado;
    } catch (error) {
        return error;
    }
}

module.exports = {
    obtenerRespuesta
}