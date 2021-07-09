
const controllerLoquidacion = {};
const { simuladorAcf } = require('../helper/UtilAcf');
const { Success, Error } = require('../helper/Respuesta');
const moment = require("moment");
const daoLiquidacion = require('../dao/transaccion.dao');
//const daoLiquidacion = require('../dao/liquidacion.dao');

controllerLoquidacion.simulacion = async(req, res) => {
    try {
        const datos = req.body;
        //correo dato de entrada        
        const simulador = await simuladorAcf(datos);
    
        if (simulador) {
            Success(res, simulador);
        } else {
            Success(res, simulador, 204); 
        }
    } catch (error) {
        Error(res, error);
    }
};

controllerLoquidacion.update = async(req, res) => {
    try {
        const datos = req.body;

            let datosLiquidacion = {};

            datosLiquidacion.idLiquidacion = datos.idLiquidacion;
            datosLiquidacion.estado = datos.estado;
            datosLiquidacion.observacion= datos.observacion;

            const liquidacion = await daoLiquidacion.setPlanilla(datosLiquidacion);

            if (liquidacion) {
                Success(res, liquidacion, 201);
            }else{
                Error(res, liquidacion);

            }

    } catch (error) {
        Error(res, error);
    }
}

module.exports =controllerLoquidacion ;
