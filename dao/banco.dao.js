const { SqlConnection, sql } = require('../conexion/conexion');

async function setConfigBanco(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idCtaBan', sql.Int, datos.idCtaBan);
        request.input('tipCtaBan', sql.VarChar(5), datos.tipCtaBan);
        request.input('codBanco', sql.VarChar(5), datos.codBanco);
        request.input('codMoneda', sql.VarChar(10), datos.codMoneda);
        request.input('cci', sql.VarChar(30), datos.cci);
        request.input('ctaBanc', sql.NVarChar(40), datos.ctaBanc);

        const {recordset:resultado} = await request.execute('administrativo.updateCuentasBanco');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function setCreateBanco(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('ccb', sql.VarChar(30), datos.ccb);
        request.input('tipCtaBan', sql.VarChar(5), datos.tipCtaBan);
        request.input('codBanco', sql.VarChar(5), datos.codBanco);
        request.input('cci', sql.VarChar(30), datos.cci);
        request.input('ctaBanc', sql.VarChar(40), datos.ctaBanc);
        request.input('swift', sql.VarChar(30), datos.swift);
        request.input('codMoneda', sql.VarChar(10), datos.codMoneda);
        request.input('idUsuario', sql.Int, datos.idUsuario);

        const {recordset:resultado} = await request.execute('administrativo.registrarCuentasBanco');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getListBanco(datos){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('idCtaBan', sql.Int, datos.idCtaBan);
        const {recordset:resultado} = await request.execute('administrativo.listarBancosSponsor');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function getDeleteBanco(idCtaBan){
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idCtaBan', sql.Int, idCtaBan);
        const {recordset:resultado} = await request.execute('administrativo.deleteBancosId');
        return resultado;
    } catch (error) {
        return error;
    }
}

module.exports = {setConfigBanco, getListBanco, setCreateBanco, getDeleteBanco}