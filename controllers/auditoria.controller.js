const ControllerAuditoria = {};
const { Success, Error } = require('../helper/Respuesta');
const daoAuditoria = require('../dao/auditoria.dao');
const moment = require("moment");

ControllerAuditoria.registrar = async (req, res) => {
    try {
        const datos = req.body;

        let datosAuditoria = {};

            datosAuditoria.idUsuario = datos.idUsuario;
            datosAuditoria.operacion = datos.operacion;
            datosAuditoria.tabla = datos.tabla;
            datosAuditoria.idReg = datos.idReg;
            datosAuditoria.atributos = datos.atributos;

            const auditoria = await daoAuditoria.setAuditoria(datosAuditoria);
            
            if (auditoria.idAuditoria > 0) {  
                Success(res, auditoria, 201);
            } else {
                Error(res, auditoria);
            }
        
    } catch (error) {
        Error(res, error);
    }
}

ControllerAuditoria.list = async (req, res) => {
    try {
        const fecha = req.body;
        const result = await daoAuditoria.getAuditoria(fecha);
        let paginado = (result.filas/fecha.fila)
        let entero =0;
        if(paginado % 1 === 0){
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

module.exports = ControllerAuditoria;