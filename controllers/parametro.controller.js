
const ControllerParametro = {};
const { Success, Error } = require('../helper/Respuesta');
const daoParametro = require('../dao/parametro.dao');

ControllerParametro.getListaParametros = async(req, res) => {
    try {
        const parametro = req.body;
        const resultado = await daoParametro.getListarParametros(parametro);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
};

ControllerParametro.getListaParametrosAut = async(req, res) => {
    try {
        const datos = req.body;
        const resultado = await daoParametro.getListarParametrosAuto(datos);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
};


ControllerParametro.postParametroCrea = async(req, res) => {
    try {
        const datos = req.body;
        const resultado = await daoParametro.postParametroCrear(datos);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
};

ControllerParametro.setActualizarParametro = async(req, res) => {
    try {
        const datos = req.body;
        const resultado = await daoParametro.setParametroActualizar(datos); 
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
};

ControllerParametro.setParametroEliminar = async(req, res) => {
    try {
        const idParametro = req.params.idParametro;
        
        const resultado = await daoParametro.setParametroElimina(idParametro);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
}; 

ControllerParametro.listarParametroXid = async(req, res) => {
    try {
        const idParametro = req.params.idParametro;

        const resultado = await daoParametro.getParametroxID(idParametro);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
}; 
ControllerParametro.listarParametroEtiqueta = async(req, res) => {
    try {
        const resultado = await daoParametro.getParametroEtiquetas();
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
}; 


module.exports =ControllerParametro ;