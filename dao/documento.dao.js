const { SqlConnection, sql } = require('../conexion/conexion');

async function postDocumentoCrear(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idNumDoc', sql.VarChar(30), datos.numDoc);
        request.input('fecEmi', sql.Date, datos.fechaEmision);
        request.input('tipDoc', sql.VarChar(5), datos.tipoDoc); 
        request.input('tipMoneda', sql.VarChar(3), datos.tipoMoneda);
        request.input('mtoDoc', sql.Decimal(18,2), datos.montoDoc);
        request.input('fecVen', sql.DateTime, datos.fechaVencimiento);
        request.input('estado', sql.Char(3), datos.estado);
        request.input('igv', sql.Decimal(18,2), datos.igv);
        request.input('observacion', sql.VarChar(150), datos.condicion);
        request.input('docXML', sql.VarChar(40), datos.docXML);
        request.input('guiaRemision', sql.VarChar(30), datos.guiaRemision);
        request.input('mtoDescuento', sql.Decimal(18,2), 0);
        request.input('mtoNeto', sql.Decimal(18,2), datos.montoNeto); 
        request.input('mtoRetencion', sql.Decimal(18,2), datos.retencion); 
        request.input('idUsuAct', sql.Int, datos.idUsuario); 
        request.input('idUsuReg', sql.Int, datos.idUsuario); 
        request.input('ruc', sql.Char(11), datos.ruc); 

        
        const {recordset:resultado} = await request.execute('operativo.registrarDocumento');
        
        return resultado[0];
    } catch (error) {
        return error;
    }
}

module.exports = {
    postDocumentoCrear
}