const ControllerBanco = {};
const { Success, Error } = require('../helper/Respuesta');
const daoBanco = require('../dao/banco.dao');
const moment = require("moment");

ControllerBanco.actualizar = async (req, res) => {
    try {
        const datos = req.body;

        let datosBanco = {};

        datosBanco.idCtaBan = datos.idCtaBan;
        datosBanco.tipCtaBan = datos.tipCtaBan;
        datosBanco.codBanco = datos.codBanco;
        datosBanco.codMoneda = datos.codMoneda;
        datosBanco.cci = datos.cci;
        datosBanco.ctaBanc = datos.ctaBanc;

        const banco = await daoBanco.setConfigBanco(datosBanco);

        if (banco.RSPTA == 0) {
            Success(res, banco, 201);
        } else {
            Error(res, banco);
        }

    } catch (error) {
        Error(res, error);
    }
}

ControllerBanco.crear = async (req, res) => {
    try {
        const datos = req.body;

        let datosBanco = {};

        datosBanco.idSponsor = datos.idSponsor;
        datosBanco.ccb = datos.ccb;
        datosBanco.tipCtaBan = datos.tipCtaBan;
        datosBanco.codBanco = datos.codBanco;
        datosBanco.cci = datos.cci;
        datosBanco.ctaBanc = datos.ctaBanc;
        datosBanco.swift = datos.swift;
        datosBanco.codMoneda = datos.codMoneda;
        datosBanco.idUsuario = datos.idUsuario;

        const banco = await daoBanco.setCreateBanco(datosBanco);

        if (banco.RSPTA == 0) {
            Success(res, banco, 201);
        } else {
            Success(res, banco);
        }

    } catch (error) {
        Error(res, error);
    }
}

ControllerBanco.listBanco = async (req, res) => {
    try {
        const datos = req.body;
        const result = await daoBanco.getListBanco(datos);
        
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        
        Error(res, error);
    }
}

ControllerBanco.deleteBanco = async (req, res) => {
    try {
        const idCtaBan = req.params.idCtaBan;
        const result = await daoBanco.getDeleteBanco(idCtaBan);
        
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        
        Error(res, error);
    }
}
module.exports = ControllerBanco;