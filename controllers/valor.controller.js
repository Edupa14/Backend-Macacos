const valorController = {};
const { Success, Error } = require('../helper/Respuesta');
const daoValor = require('../dao/valor.dao');
valorController.guardarConfiguracionProducto = async(req, res) => {
    try {
        const datos = req.body;
        let update = {} 
        update.codVal = datos[0].codVal;
        update.idUsuario = datos[0].idUsuario
        let conf = [];
        const actualizar = await daoValor.actualizarValores(update);
        await Promise.all(datos.map(async function(item) {
            let datosC = {};
            datosC.codVal = item.codVal;
            datosC.idParametro =item.idParametro;
            datosC.valor = item.valor;
            datosC.adicional = item.adicional;
            datosC.idUsuario = item.idUsuario;
            let resultado = await daoValor.postValor(datosC);
            conf.push(resultado);
        })); 
        if (conf.length > 0) {
            Success(res, conf);
        } else { 
            Success(res, conf, 204);
        } 

    } catch (error) {
        Error(res, error);
    }
};

valorController.actualizarValor = async(req, res) => {
    try {
        const datos = req.body;
        let conf = [];
        await Promise.all(datos.map(async function(item) {
            let datosC = {};
            datosC.codVal = item.codVal;
            datosC.idParametro =item.idParametro;
            datosC.valor = item.valor;
            datosC.adicional = item.adicional;
            const actualizar = await daoValor.actualizarValores(datosC);
            if(actualizar.RSPTA ==0){
                let resultado = await daoValor.postValor(datosC);
                conf.push(resultado);
            }
        }));
        if (conf.length > 0) {
            Success(res, conf);
        } else { 
            Success(res, conf, 204);
        } 

    } catch (error) {
        Error(res, error);
    } 
};

valorController.listarValores = async(req, res) => {
    try {
        const codVal = req.params.codVal;
        const resultado = await daoValor.listarValor(codVal);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }
    } catch (error) {
        Error(res, error);
    }
};
valorController.listarValoresINA = async(req, res) => {
    try {
        const codVal = req.params.codVal;
        const resultado = await daoValor.listarValorINA(codVal);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }
    } catch (error) {
        Error(res, error);
    }
};


module.exports =valorController ;