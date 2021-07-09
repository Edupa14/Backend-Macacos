const ControllerLog = {};
const { Success, Error } = require('../helper/Respuesta');
const daoLog = require('../dao/log.dao');
const moment = require("moment");

ControllerLog.registrar = async (req, res) => {
    try {
        const datos = req.body;

        let datosLog = {};

            datosLog.idUsuario = datos.idUsuario;
            datosLog.proceso = datos.proceso;
            datosLog.url = datos.url;


            const log = await daoLog.setLogCrear(datosLog);
            if (log.idLog > 0) {
                
                Success(res, log, 201);
            } else {
                Error(res, log);

            }
        
    } catch (error) {
        Error(res, error);
    }
}

ControllerLog.listLog = async (req, res) => {
    try {
        const fecha = req.body;
        // let fechaInit1 = moment(fecha.fechaInit, 'DD-mm-yyyy').format('yyyy-mm-DD');
        // let fechaFin1 = moment(fecha.fechaFin, 'DD-mm-yyyy').format('yyyy-mm-DD');
        // fecha.fechaInit = fechaInit1;
        // fecha.fechaFin = fechaFin1;
        const result = await daoLog.getLogListar(fecha);
        let paginado = (result.filas/fecha.fila)
        let entero =0;
        if(paginado%1 === 0){
               result.paginado = paginado;
        }else{
            entero = paginado;
            result.paginado = parseInt(entero)+1;
        }
        
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        
        Error(res, error);
    }
}

module.exports = ControllerLog;