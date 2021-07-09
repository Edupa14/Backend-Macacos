const { SqlConnection, sql } = require('../conexion/conexion');
const validar = require('../helper/utilitarios'); 
async function postTransaccionCrear(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('mtoAbono', sql.Decimal(18,2), datos.montoDoc);
        request.input('numDoc', sql.VarChar(30), datos.numDoc);
        request.input('idProveedor', sql.Int, datos.idProveedor);
        request.input('numOpe', sql.Int, datos.numOperacion);
        request.input('idUsuario', sql.Int, datos.idUsuario);  
        request.input('idLiquidacion', sql.Int, datos.idLiquidacion);  
        request.input('mtoNetoFinan', sql.Decimal(18,2), datos.mtoNetoFinan); 
        request.input('mtoTotFacDesc', sql.Decimal(18,2), datos.mtoTotFacDesc); 
        request.input('mtoTea', sql.Decimal(18,2), datos.mtoTea); 
        const {recordset:resultado} = await request.execute('operativo.registrarTransaccion');
        return resultado[0];  
    } catch (error) {   
        return error; 
    }
}

async function agregarArchivo(file) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        const archivo = file.xml != undefined ? file.xml : file.pdf;
        const {recordset:resultado} = await request.execute('');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function getNumOperacion() {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        
        const {recordset:resultado} = await request.execute('operativo.ObtenerNumOperacion');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function listarPlanilla(planilla) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        if(validar.validarNulo(planilla.numOperacion)){ 
            request.input('numOperacion', sql.Int, planilla.numOperacion);
        }
        if(validar.validarNulo(planilla.estado)){ 
            request.input('estado', sql.Char(4), planilla.estado);
        }
        if(validar.validarNulo(planilla.fechaInit)){ 
            request.input('fechaInit', sql.Date, planilla.fechaInit);
        } 
        if(validar.validarNulo(planilla.fechaFin)){ 
            request.input('fechaFin', sql.Date, planilla.fechaFin);
        }
        if(validar.validarNulo(planilla.numDocu)){ 
            request.input('numDocu', sql.VarChar(30), planilla.numDocu);
        }
        if(validar.validarNulo(planilla.idSponsor)){ 
            request.input('idSponsor', sql.Int, planilla.idSponsor);
        }
        if(validar.validarNulo(planilla.idLiquidacion)){ 
            request.input('idLiquidacion', sql.Int, planilla.idLiquidacion);
        }
        request.input('fila', sql.Int, planilla.fila);
        request.input('pagina', sql.Int, (planilla.pagina - 1) * planilla.fila);
        const {recordset:filas} = await request.execute('operativo.listarPlanillaFilas');
        const {recordset:resultado} = await request.execute('operativo.listarPlanilla');
        const result = {};
        result.filas = filas[0].filas;
        result.data = resultado; 
        return result;
    } catch (error) {
        return error;
    }
}

async function setPlanilla(pantilla) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idLiquidacion', sql.Int, pantilla.idLiquidacion);
        request.input('estado', sql.Char(4), pantilla.estado);
        request.input('observacion', sql.VarChar(200), pantilla.observacion);
        const {recordset:resultado} = await request.execute('operativo.actualizarLiquidacion');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function listarPlanillaReproceso(datosPlanilla) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('estado', sql.Char(4), datosPlanilla.estado);
        const {recordset:resultado} = await request.execute('operativo.listarPlanillaReproceso');
        return resultado;
    } catch (error) {
        return error;
    }
}
async function obtenerPlanillaReproceso(datosPlanilla) {
    /*console.log(datosPlanilla,'datotes')*/
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idPlanilla', sql.Int, datosPlanilla.idPlanilla);
        const {recordset:resultado} = await request.execute('operativo.obtenerPlanillaReproceso');
        return resultado;
    } catch (error) {
        return error;
    }
}
async function reprocesarPlanilla(datosPlanilla) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idPlanilla', sql.Int, datosPlanilla.idPlanilla);
        request.input('idTransaccion', sql.Int, datosPlanilla.idTransaccion);
        request.input('numDoc', sql.VarChar, datosPlanilla.numDoc);
        request.input('fechaVen', sql.Date, datosPlanilla.fecVen);
        request.input('idUsuario', sql.Int, datosPlanilla.idUsuario);
        request.input('observacion', sql.VarChar(200), datosPlanilla.observacion);
        const {recordset:resultado} = await request.execute('operativo.reprocesarPlanilla');
        return resultado;
    } catch (error) {
        return error;
    }
}


async function buscarTransaccion(transaccion) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('fechaRegistroInicio', sql.Date, transaccion.fechaRegistroInicio);
        request.input('fechaRegistroFin', sql.Date, transaccion.fechaRegistroFin);
        if(validar.validarNulo(transaccion.fechaEmisionInicio)){ 
            request.input('fechaEmisionInicio', sql.DateTime, transaccion.fechaEmisionInicio);
        }
        if(validar.validarNulo(transaccion.fechaEmisionFin)){
            request.input('fechaEmisionFin', sql.DateTime, transaccion.fechaEmisionFin);
        }
        if(validar.validarNulo(transaccion.fechaVencimientoInicia)){
            request.input('fechaVencimientoInicia', sql.DateTime, transaccion.fechaVencimientoInicia);
        }
        if(validar.validarNulo(transaccion.fechaVencimientoFin)){
            request.input('fechaVencimientoFin', sql.DateTime, transaccion.fechaVencimientoFin);
        }
        if(validar.validarNulo(transaccion.numOperacion)){
            request.input('numOperacion', sql.Int, transaccion.numOperacion);
        }
        if(validar.validarNulo(transaccion.numDocu)){
            request.input('numDocu', sql.VarChar(30), transaccion.numDocu);
        }
        if(validar.validarNulo(transaccion.estado)){
            request.input('estado', sql.VarChar(3), transaccion.estado);
        }
        if(validar.validarNulo(transaccion.idSponsor)){
            request.input('sponsor', sql.Int, transaccion.idSponsor); 
        }
        if(validar.validarNulo(transaccion.idProveedor)){
            request.input('proveedor', sql.Int, transaccion.idProveedor); 
        }
        if(validar.validarNulo(transaccion.codProducto)){
            request.input('codProducto', sql.VarChar(50), transaccion.codProducto); 
        }
        if(validar.validarNulo(transaccion.idLiquidacion)){
            request.input('idLiquidacion', sql.Int, transaccion.idLiquidacion);
        }
        
        //request.input('fila', sql.Int, transaccion.fila);
        //request.input('pagina', sql.Int, transaccion.pagina);
        const {recordset:resultado} = await request.execute('operativo.buscarTransaccion');
        return resultado;
    } catch (error) {
        return error;
    }
}




module.exports = {
    postTransaccionCrear, agregarArchivo, getNumOperacion, listarPlanilla, buscarTransaccion, setPlanilla, listarPlanillaReproceso, obtenerPlanillaReproceso, reprocesarPlanilla
}
