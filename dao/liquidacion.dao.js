const { SqlConnection, sql } = require('../conexion/conexion');
const validar = require('../helper/utilitarios'); 


async function postLiquidacionCrear(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor); 
        request.input('idUsuario', sql.Int, datos.idUsuario);
        request.input('codProducto', sql.VarChar(10), datos.tipoProducto);
        request.input('mtoPlanilla', sql.VarChar(300), datos.mtoPlanilla);
        request.input('tea', sql.Decimal(18,2), datos.tea);
        const {recordset:resultado} = await request.execute('operativo.registrarLiquidacion');
        return resultado[0]; 
    } catch (error) {  
        return error; 
    }
}

module.exports = {
    postLiquidacionCrear
}