const { SqlConnection, sql } = require('../conexion/conexion');
const validar = require('../helper/utilitarios');
async function postValor(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        if(validar.validarNulo(datos.valor) && validar.validarNulo(datos.codVal)){
            request.input('codVal', sql.VarChar(50), datos.codVal);
            request.input('idParametro', sql.Int, datos.idParametro);
            request.input('valor', sql.VarChar(50), datos.valor);
            request.input('adicional', sql.VarChar(150), datos.adicional);
            request.input('idUsuario', sql.Int, parseInt(datos.idUsuario));
            const {recordset:resultado} = await request.execute('administrativo.crearValor');
            return resultado[0];
         }else{
             return "Debe enviar datos no nulos"
         }
        
    } catch (error) {
        return error;
    }
}

async function actualizarValores(datos){
    
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('codVal', sql.VarChar(50), datos.codVal);
        request.input('idUsuario', sql.Int, parseInt(datos.idUsuario));
       // request.input('idParametro', sql.Int, datos.idParametro);
        const {recordset:resultado} = await request.execute('administrativo.inhabilitarValor');
        return resultado[0];
        
    } catch (error) {
        return error;
    }
}

async function listarValor(codVal){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
            request.input('codVal', sql.VarChar(50), codVal);
            const {recordset:resultado} = await request.execute('administrativo.listarValor');
            return resultado;
        
    } catch (error) {
        return error;
    }
}
async function listarValorINA(codVal){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
            request.input('codVal', sql.VarChar(50), codVal);
            request.input('valor', sql.VarChar(50), 'valor');
            const {recordset:resultado} = await request.execute('administrativo.listarValor');
            return resultado;
        
    } catch (error) {
        return error;
    }
}

module.exports = {
    postValor, actualizarValores, listarValor,listarValorINA 
}