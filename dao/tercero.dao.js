const { SqlConnection, sql } = require('../conexion/conexion');

async function setTerceroCrear(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('tipTercero', sql.VarChar(10), datos.tipTercero);
        request.input('nombre', sql.VarChar(150), datos.nombre);
        request.input('apePat', sql.VarChar(150), datos.apePat);
        request.input('apeMat', sql.VarChar(150), datos.apeMat);
        request.input('correo', sql.VarChar(150), datos.correo);
        request.input('nroDoc', sql.VarChar(20), datos.numeroDoc);
        request.input('razonSocial', sql.VarChar(100), datos.razonSocial);
        request.input('tipDoc', sql.VarChar(10), datos.tipoDoc);
        request.input('direccion', sql.VarChar(200), datos.direccion);
        request.input('telefono', sql.VarChar(100), datos.telefono);
        request.input('idPadre', sql.Int, datos.idPadre);
        request.input('idUsuReg', sql.Int, datos.idUsuReg);
        request.input('idUsuAct', sql.Int, datos.idUsuAct);
        const {recordset:resultado} = await request.execute('administrativo.registrarTercero');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function deleteTerceroById(id){
        try{
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idTercero', sql.Int, id.idTercero);

        const {recordset:resultado} = await request.execute('administrativo.deleteTerceroId');

        return resultado[0];
    }catch (error) {
        return error;
    }
}

async function getTerceroId(idTercero){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('id', sql.Int, idTercero);
        const {recordset:resultado} = await request.execute('administrativo.listarTercero');
        return resultado[0];
    } catch (error) {
        return error; 
    }
}

async function setTerceroActualizar(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idTercero', sql.Int, datos.idTercero);
        request.input('tipTercero', sql.VarChar(10), datos.tipTercero);
        request.input('nombre', sql.VarChar(150), datos.nombre);
        request.input('apePat', sql.VarChar(150), datos.apePat);
        request.input('apeMat', sql.VarChar(150), datos.apeMat);
        request.input('razonSocial', sql.VarChar(100), datos.razonSocial);
        request.input('idPadre', sql.Int, datos.idPadre);
        request.input('telefono', sql.VarChar(100), datos.telefono);
        request.input('estadoT', sql.VarChar(4), datos.estadoT);
        request.input('idUsuAct', sql.Int, datos.idUsuAct); 
        request.input('direccion', sql.VarChar(200), datos.direccion);
        request.input('correo', sql.VarChar(200), datos.correo);
        request.input('nroDoc', sql.VarChar(50), datos.nroDoc);
        const {recordset:resultado} = await request.execute('administrativo.updateTercero');
        return resultado[0]; 
    } catch (error) {
        return error;
    }
}

async function setTerceroEliminar(idTercero) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idTercero', sql.Int, idTercero);
        const {recordset:resultado} = await request.execute('administrativo.editEstadoTercero');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getTerceroRol(idTercero) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('id', sql.Int, idTercero);
        const {recordset:resultado} = await request.execute('administrativo.listarUsuarioTerceroRol');
        return resultado;
    } catch (error) {
        return error; 
    }
}

async function getTercero(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request(); 
        request.input('tipTercero', sql.VarChar(4), datos.tipTercero);
        const {recordset:resultado} = await request.execute('administrativo.listarTerceroT');
        return resultado;
    } catch (error) {
        return error; 
    }
}

module.exports = {
    setTerceroCrear,
    deleteTerceroById,
    setTerceroActualizar,
    getTerceroId,
    setTerceroEliminar,
    getTerceroRol,
    getTercero
}