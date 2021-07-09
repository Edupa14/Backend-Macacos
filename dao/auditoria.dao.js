const { SqlConnection, sql } = require('../conexion/conexion');

async function setAuditoria(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, datos.idUsuario);
        request.input('operacion', sql.VarChar(50), datos.operacion);
        request.input('tabla', sql.VarChar(50), datos.tabla);
        request.input('idReg', sql.Int, datos.idReg);
        request.input('atributos', sql.NVarChar(200), datos.atributos);

        const {recordset:resultado} = await request.execute('administrativo.registrarAuditoria');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getAuditoria(fecha){ 
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('fechaInit', sql.Date, fecha.fechaInit);
        request.input('fechaFin', sql.Date, fecha.fechaFin);
        request.input('usuario', sql.Int, fecha.usuario);
        request.input('operacion', sql.VarChar(5), fecha.operacion);
        request.input('fila', sql.Int, fecha.fila);
        request.input('pagina', sql.Int, (fecha.pagina - 1) * fecha.fila);
        const {recordset:filas} = await request.execute('administrativo.listarAuditoriaFilas');
        const {recordset:resultado} = await request.execute('administrativo.listarAuditoria');
        const result = {};
        result.filas = filas[0].filas;
        result.data = resultado; 
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = {
    setAuditoria,
    getAuditoria
}