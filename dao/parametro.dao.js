const { SqlConnection, sql } = require('../conexion/conexion');

async function postParametroCrear(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('etiqueta', sql.VarChar(50), datos.etiqueta);
        request.input('descripcion', sql.VarChar(100), datos.descripcion);
        request.input('valor', sql.VarChar(10), datos.valor);
        request.input('idPadre', sql.Int, datos.idPadre);
        request.input('tipoInput', sql.VarChar(20), datos.tipoInput);
        if(datos.estado){ 
            request.input('estado',sql.Char(4), datos.estado);
        }
        const {recordset:resultado} = await request.execute('administrativo.crearParametro');
        return resultado[0];
    } catch (error) {
        return error;
    }
}


async function setParametroActualizar(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idParametro', sql.VarChar(50), datos.idParametro);
        request.input('etiqueta', sql.VarChar(50), datos.etiqueta);
        request.input('descripcion', sql.VarChar(100), datos.descripcion);
        request.input('valor', sql.VarChar(10), datos.valor);
        request.input('idPadre', sql.Int, datos.idPadre);
        request.input('tipoInput', sql.VarChar(20), datos.tipoInput);
        if(datos.estado){
            request.input('estado',sql.Char(4), datos.estado);
        }
        const {recordset:resultado} = await request.execute('administrativo.updateParametro');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function setParametroElimina(idParametro){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idParametro', sql.Int, idParametro);
        //Solo se cambia el estado a ELIM
        const {recordset:resultado} = await request.execute('administrativo.deleteParametro');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getListarParametros(parametro) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        if(parametro.etiqueta){
            request.input('etiqueta', sql.VarChar(50), parametro.etiqueta);
        }
        if(parametro.idPadre){
            request.input('idPadre', sql.Int, parametro.idPadre); 
        }
        if(parametro.estado){
            request.input('estado', sql.Char(3), parametro.estado);
        }
        if(parametro.tipoInput){
            request.input('tipoInput', sql.VarChar(10), parametro.tipoInput);
        }
        if(parametro.validacion){
            request.input('validacion', sql.Int, parametro.validacion);
        }
        
        const {recordset:resultado} = await request.execute('administrativo.listarParametro');
        return resultado;
    } catch (error) {
        return error;
    } 
} 

async function getListarParametrosAuto(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);  
        request.input('codigoPro', sql.VarChar(4), datos.codigoPro);  
        request.input('valor', sql.VarChar(4), datos.valor);        
        const {recordset:resultado} = await request.execute('administrativo.listarParametroAuto');
        return resultado[0];
    } catch (error) {
        return error;
    } 
} 

async function getParametroxID(idParametro) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idParametro', sql.Int, idParametro);
        const {recordset:resultado} = await request.execute('administrativo.listarParametroxId');
        return resultado[0];
    } catch (error) {
        return error;
    }
}
async function getParametroEtiquetas() {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        const {recordset:resultado} = await request.execute('administrativo.listarParametroEtiqueta');
        return resultado;
    } catch (error) {
        return error;
    }
}



module.exports = {
    postParametroCrear, setParametroActualizar, setParametroElimina, getListarParametros, getParametroxID, getParametroEtiquetas, getListarParametrosAuto
}