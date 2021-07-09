const { SqlConnection, sql } = require('../conexion/conexion');

async function setLogCrear(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, datos.idUsuario);
        request.input('proceso', sql.VarChar(50), datos.proceso);
        request.input('url', sql.VarChar(50), datos.url);

        const {recordset:resultado} = await request.execute('administrativo.registrarLog');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getLogListar(fecha){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('fechaInit', sql.Date, fecha.fechaInit);
        request.input('fechaFin', sql.Date, fecha.fechaFin);
        request.input('usuario', sql.Int, fecha.usuario);
        request.input('fila', sql.Int, fecha.fila);
        request.input('pagina', sql.Int, (fecha.pagina - 1) * fecha.fila);
        const {recordset:filas} = await request.execute('administrativo.listarLogFilas');
        const {recordset:resultado} = await request.execute('administrativo.listarLog');
        const result = {};
        result.filas = filas[0].filas;
        result.data = resultado;
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    setLogCrear,
    getLogListar
}