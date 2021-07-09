const ControllerTercero = {};
const { Success, Error } = require('../helper/Respuesta');
const daoTercero = require('../dao/tercero.dao');
const daoCtaBanco = require('../dao/cuentasBanco.dao');
ControllerTercero.registrar = async(req, res) => {
    try {
        const datos = req.body;

            let datosTercero = {};

            datosTercero.tipTercero = datos.tipTercero;
            datosTercero.nombre = datos.nombre;
            datosTercero.apePat= datos.apePat;
            datosTercero.apeMat= datos.apeMat;
            datosTercero.correo = datos.correo;
            datosTercero.numeroDoc = datos.numeroDoc;
            datosTercero.razonSocial = datos.razonSocial;
            datosTercero.direccion = datos.direccion;
            datosTercero.tipoDoc = datos.tipoDoc;
            datosTercero.telefono = datos.telefono;
            datosTercero.idPadre = datos.idPadre;
            datosTercero.idUsuReg = datos.idUsuReg;
            datosTercero.idUsuAct = datos.idUsuAct;

            const tercero = await daoTercero.setTerceroCrear(datosTercero);
            if (tercero) {
                Success(res, tercero, 201);
            }else{
                Error(res, tercero);

            }

    } catch (error) {
        Error(res, error);
    }
}

ControllerTercero.update = async(req, res) => {
    try {
        const datos = req.body;
        let datosTercero = {};
            datosTercero.idTercero = datos.idTercero;
            datosTercero.tipTercero = datos.tipTercero;
            datosTercero.nombre = datos.nombre;
            datosTercero.apePat= datos.apePat;
            datosTercero.apeMat= datos.apeMat;
            datosTercero.razonSocial = datos.razonSocial;
            datosTercero.telefono = datos.telefono;
            datosTercero.idPadre = datos.idPadre;
            datosTercero.estadoT = datos.estadoT;
            datosTercero.idUsuAct = datos.idUsuAct;
            datosTercero.direccion = datos.direccion;
            datosTercero.correo = datos.correo;
            datosTercero.nroDoc = datos.nroDoc;
            const tercero = await daoTercero.setTerceroActualizar(datosTercero);
            
            if (tercero.RSPTA == 0) {
                Success(res, tercero, 201); 
                
            }else{
                Error(res, tercero);

            }
    }catch (error) {
        Error(res, error);
    }
}

ControllerTercero.editEstado = async (req, res) => {
    try {
        const idTercero = req.params.idTercero;
        const tercero = await daoTercero.setTerceroEliminar(idTercero);
        
        if (tercero) {
            Success(res, tercero, 201);
        } else {
            Error(res, tercero);

        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerTercero.list = async(req, res) => {
    try {
        const idTercero = req.params.idTercero;
        const result = await daoTercero.getTerceroId(idTercero);
        if (result) {
            Success(res, result);
        }else{
            Success(res, result, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerTercero.listTodo = async(req, res) => {
    try {
        const datos = req.body;
        const result = await daoTercero.getTercero(datos);
        if (result) {
            Success(res, result);
        }else{
            Success(res, result, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

module.exports =ControllerTercero ;