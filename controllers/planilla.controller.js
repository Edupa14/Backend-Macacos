
const controllerPlanilla = {};
const { Success, Error } = require('../helper/Respuesta');
const moment = require("moment");
const daoPlanilla = require('../dao/transaccion.dao');
//const daoPlanilla = require('../dao/liquidacion.dao');

controllerPlanilla.listar = async(req, res) => {
    try {
        const datos = req.body;

            let datosPlanilla = {};
            datosPlanilla.estado = datos.estado;

            const liquidacion = await daoPlanilla.listarPlanillaReproceso(datosPlanilla);

            if (liquidacion) {
                Success(res, liquidacion, 201);
            }else{
                Error(res, liquidacion);

            }

    } catch (error) {
        Error(res, error);
    }
}
controllerPlanilla.obtener = async(req, res) => {
    try {
        const datos = req.body;

            let datosPlanilla = {};
            datosPlanilla.idPlanilla = datos.idPlanilla;

            const liquidacion = await daoPlanilla.obtenerPlanillaReproceso(datosPlanilla);

            if (liquidacion) {
                Success(res, liquidacion, 201);
            }else{
                Error(res, liquidacion);
            }

    } catch (error) {
        Error(res, error);
    }
}
controllerPlanilla.reprocesar = async(req, res) => {
    try {
        const datos = req.body;

            let datosPlanilla = {};
            datosPlanilla.idPlanilla = datos.idPlanilla;
            datosPlanilla.idTransaccion = datos.idTransaccion;
            datosPlanilla.numDoc = datos.numDoc;            
            datosPlanilla.fecVen = datos.fecVen;
            datosPlanilla.idUsuario = datos.idUsuario;
            datosPlanilla.observacion = datos.observacion;

            const liquidacion = await daoPlanilla.reprocesarPlanilla(datosPlanilla);

            if (liquidacion) {
                Success(res, liquidacion, 201);
            }else{
                Error(res, liquidacion);
            }

    } catch (error) {
        Error(res, error);
    }
}
module.exports = controllerPlanilla ;
