const { SqlConnection, sql } = require('../conexion/conexion');
const { MAX } = require('mssql');

async function listNotificaciones(param){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('tipNotif', sql.VarChar(20), param.tipNotif);
        request.input('tipNotEtiqueta', sql.VarChar(4), param.tipNotEtiqueta);
        const {recordset:resultado} = await request.execute('administrativo.listarNotificaciones');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function listNotificacion(idNotificacion){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idNotificacion', sql.Int, idNotificacion);

        const {recordset:resultado} = await request.execute('administrativo.listarNotificacionesId');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function setNotificacionCrear(notif){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, notif.idUsuario);
        request.input('notificacion', sql.VarChar(30), notif.notificacion);
        request.input('tipNotEtiqueta', sql.VarChar(4), notif.tipNotEtiqueta);
        request.input('asunto', sql.VarChar(100), notif.asunto);
        request.input('de', sql.VarChar(150), notif.de);
        request.input('para', sql.VarChar(150), notif.para);
        request.input('cc', sql.VarChar(150), notif.cc);
        request.input('cco', sql.VarChar(150), notif.cco);
        request.input('mensaje', sql.VarChar(MAX), notif.mensaje);
        request.input('tipNotif', sql.VarChar(3), notif.tipNotif);
        request.input('fecDesde', sql.Date, notif.fecDesde);
        request.input('fecHasta', sql.Date, notif.fecHasta);
        
        const {recordset:resultado} = await request.execute('administrativo.registrarNotificacion');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function setNotificacionEditar(notif){

    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idNotificacion', sql.Int, notif.idNotificacion);
        request.input('notificacion', sql.VarChar(30), notif.notificacion);
        request.input('asunto', sql.VarChar(100), notif.asunto);
        request.input('para', sql.VarChar(150), notif.para);
        request.input('cc', sql.VarChar(150), notif.cc);
        request.input('cco', sql.VarChar(150), notif.cco);
        request.input('mensaje', sql.VarChar(MAX), notif.mensaje);
        request.input('fecDesde', sql.Date, notif.fecDesde);
        request.input('fecHasta', sql.Date, notif.fecHasta);
        request.input('estadoNot', sql.VarChar(20), notif.estadoNot);
        request.input('estado', sql.Char(3), notif.estado);
        
        const {recordset:resultado} = await request.execute('administrativo.actualizarNotificacion');
        return resultado[0];
    } catch (error) {
        return error;
    }
}
async function setNotificacionEliminar(idNotificacion) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idNotificacion', sql.Int, idNotificacion);
        const {recordset:resultado} = await request.execute('administrativo.editEstadoNotificacion');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

module.exports = {
    listNotificaciones,
    setNotificacionCrear,
    setNotificacionEditar,
    setNotificacionEliminar,
    listNotificacion
}