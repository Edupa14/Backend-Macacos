const { SqlConnection, sql } = require('../conexion/conexion');

async function getAccesoByIdUsuario(idusuario) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, idusuario);
        const {recordset:resultado} = await request.execute('administrativo.listarRoles');
        return resultado;
    } catch (error) {
        return error; 
    }
}

async function getAccesoUsuario(idUser) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuario', sql.Int, idUser);
        const {recordset:resultado} = await request.execute('administrativo.listarUsuarioAccesoRol');
        return resultado;
    } catch (error) {
        return error; 
    }
}

async function setAcceso(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('codRol', sql.VarChar(10), datos.codRol);
        request.input('codModulo', sql.VarChar(10), datos.codModulo);
        request.input('codSeccion', sql.VarChar(10), datos.codSeccion);
        request.input('perEscr', sql.Int, datos.escritura);
        request.input('perLect', sql.Int, datos.lectura);
        request.input('idUsuReg', sql.Int, datos.idUsuReg);
        request.input('idUsuAct', sql.Int, datos.idUsuAct);

        const {recordset:resultado} = await request.execute('administrativo.registrarAcceso');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getAccesoList(codRol){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('codRol', sql.VarChar(3), codRol);
        const {recordset:resultado} = await request.execute('administrativo.listarAcceso');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function setAccesoEdit(acceso){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idAcceso', sql.Int, acceso.idAcceso);
        request.input('codRol', sql.VarChar(10), acceso.codRol);
        request.input('codModulo', sql.VarChar(10), acceso.codModulo);
        request.input('codSeccion', sql.VarChar(10), acceso.codSeccion);
        request.input('perEscr', sql.Int, acceso.escritura);
        request.input('perLect', sql.Int, acceso.lectura);
        request.input('estado', sql.Char(3), acceso.estado);
        request.input('idUsuAct', sql.Int, acceso.idUsuAct);
        const {recordset:resultado} = await request.execute('administrativo.updateAcceso');
        return resultado;
    } catch (error) {
        return error;
    }
}
async function setAccesoElimina(codRol){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('codRol', sql.VarChar(10), codRol);
        //Solo se cambia el estado a ELIM
        const {recordset:resultado} = await request.execute('administrativo.deleteAcceso');
        return resultado[0];
    } catch (error) {
        return error;
    }
}


module.exports = {
    getAccesoByIdUsuario,
    getAccesoUsuario,
    setAcceso,
    getAccesoList,
    setAccesoEdit,
    setAccesoElimina,
}