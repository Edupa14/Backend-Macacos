const { SqlConnection, sql } = require('../conexion/conexion');

async function login(login) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('Correo', sql.VarChar(150), login.correo);
        const {recordset:resultado} = await request.execute('administrativo.verificaLogin');  
        return resultado[0];
    } catch (error) {
        return error; 
    }
}

async function setUsuarioCrear(user){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('clave', sql.VarChar(100), user.Clave);
        request.input('codRol', sql.VarChar(10), user.CodRol);
        request.input('idTercero', sql.Int, user.IdTercero);
        request.input('idUsuReg', sql.Int, user.IdUsuReg);
        request.input('idUsuAct', sql.Int, user.IdUsuAct);
        request.input('observacion', sql.VarChar(250), user.observacion);
        const {recordset:resultado} = await request.execute('administrativo.registrarUsuario');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getUsuarioId(idUser){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('id', sql.Int, idUser);
        const {recordset:resultado} = await request.execute('administrativo.listarUsuario');
        return resultado[0];
    } catch (error) {
        return error; 
    }
}

async function setUsuarioActualizar(user){
    try {
        
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, user.IdUsuario);
        request.input('codRol', sql.VarChar(10), user.CodRol);
        request.input('estado', sql.VarChar(4), user.estado);
        request.input('idUsuAct', sql.Int, user.IdUsuAct);
        const {recordset:resultado} = await request.execute('administrativo.updateUsuario');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function setActualizarContrasenia(pass){
    try{
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuAct', sql.Int, pass.IdUsuAct);
        request.input('idUsuario', sql.Int, pass.IdUsuario);
        request.input('clave', sql.VarChar(100), pass.Clave);
        const {recordset:resultado} = await request.execute('administrativo.updateContrasenia');
        return resultado[0];
    }catch (error) {
        return error;
    }
}

async function setUsuarioEliminar(data){
   
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, data.idUsuario);
        request.input('observacion', sql.VarChar(150), data.observacion);
        const {recordset:resultado} = await request.execute('administrativo.editEstadoUsuario');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getUsuarioRolId(idUsuario) {
    
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('id', sql.Int, idUsuario);
        const {recordset:resultado} = await request.execute('administrativo.listarUsuarioRol');
        return resultado[0];
    } catch (error) {
        return error; 
    }
}

async function getUsuario(){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        const {recordset:resultado} = await request.execute('administrativo.listarUsuarioT');
        return resultado;
    } catch (error) {
        return error; 
    }
}

module.exports = {
    login,
    setUsuarioCrear,
    getUsuarioId,
    setUsuarioActualizar,
    setUsuarioEliminar,
    getUsuarioRolId,
    getUsuario,
    setActualizarContrasenia
}