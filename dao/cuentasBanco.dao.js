const { SqlConnection, sql } = require('../conexion/conexion');

async function actualizasCuentasBanco(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idCtaBan', sql.VarChar(5), datos.idCtaBan);
        request.input('tipoCuenta', sql.VarChar(5), datos.tipoCuenta);
        request.input('banco', sql.VarChar(5), datos.banco);
        request.input('moneda', sql.VarChar(5), datos.moneda);
        request.input('cci', sql.VarChar(30), datos.cci);
        request.input('cuentaInterna', sql.VarChar(30), datos.cuentaInterna);
        request.input('idUsuAct', sql.VarChar(30), datos.idUsuAct);
        request.input('idSponsor', sql.VarChar(30), datos.idSponsor);
        
        const {recordset:resultado} = await request.execute('administrativo.updateCuentaBanco');
        return resultado[0];
    } catch (error) { 
        return error; 
    }
}

module.exports = {
    actualizasCuentasBanco
}