
const ControllerUsuario = {};
const { Success, Error } = require('../helper/Respuesta');
const daoUsuario = require('../dao/usuario.dao');
const daoTercero = require('../dao/tercero.dao');
const daoAcceso = require('../dao/acceso.dao');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

ControllerUsuario.logueo = async (req, res) => {
    try {
        const login = req.body;
        const resultado = await daoUsuario.login(login);

        const match = await bcrypt.compare(login.clave, resultado.clave);
        if (resultado.RSPTA === 0 && match) {
            resultado.clave = undefined;
            delete resultado.clave;
            resultado.accesos = await daoAcceso.getAccesoByIdUsuario(resultado.idUsuario);
            if(resultado.accesos){ 
                Success(res, resultado);
            }
        }else{
            Success(res, { RSPTA: -1 }, 204);
        }

    } catch (error) {
        Error(res, error);
    }
};

ControllerUsuario.registrar = async (req, res) => {

    try {
        const datos = req.body;

        let datosTercero = {};
        let datosUser = {};

        datosTercero.tipTercero = datos.tipTercero;
        datosTercero.nombre = datos.nombre;
        datosTercero.apePat = datos.apePat;
        datosTercero.apeMat = datos.apeMat;
        datosTercero.correo = datos.correo;
        datosTercero.numeroDoc = datos.numeroDoc;
        datosTercero.razonSocial = datos.razonSocial;
        datosTercero.tipoDoc = datos.tipoDoc;
        datosTercero.telefono = datos.telefono;
        datosTercero.idUsuReg = datos.idUsuReg;
        datosTercero.idUsuAct = datos.idUsuAct;

        const tercero = await daoTercero.setTerceroCrear(datosTercero);
        if (tercero.idTercero > 0) {
            bcrypt.hash(datos.clave, saltRounds)
                .then(async function (hash) {
                    datosUser.Clave = hash;
                    datosUser.CodRol = datos.codRol;
                    datosUser.IdTercero = tercero.idTercero;
                    datosUser.IdUsuReg = datos.idUsuReg;
                    datosUser.IdUsuAct = datos.idUsuAct;
                    datosUser.observacion = datos.observacion;
                    const user = await daoUsuario.setUsuarioCrear(datosUser);
                    if (user.idUsuario > 0) {
                        Success(res, user, 201);
                    } else {
                        const deleteTercero = await daoTercero.deleteTerceroById(tercero.idTercero);
                        Error(res, user, deleteTercero);

                    }
                });
        } else {
            Success(res, tercero);
        }


    } catch (error) {
        Error(res, error);
    }
}

ControllerUsuario.actualizarContrasenia = async (req, res) => {
    try{
        const datos = req.body;
        bcrypt.hash(datos.clave, saltRounds)
        .then(async function (hash) {
            let datosUser = {};
            datosUser.IdUsuario = datos.idUsuario;
            datosUser.Clave = hash;
            datosUser.IdUsuAct = datos.idUsuAct;

            const user = await daoUsuario.setActualizarContrasenia(datosUser);
            if (user.RSPTA == 0) {
                Success(res, user, 201);
            } else {
                Error(res, user);

            }
        });
    }catch (error) {
        Error(res, error);
    }
}
ControllerUsuario.update = async (req, res) => {
    try {
        const datos = req.body;
            let datosTercero = {};
            let datosUser = {};

            datosUser.IdUsuario = datos.idUsuario;
            datosUser.CodRol = datos.codRol;
            datosUser.estado = datos.estado;
            datosUser.IdUsuAct = datos.idUsuAct;

            const user = await daoUsuario.setUsuarioActualizar(datosUser);

            if (user.RSPTA == 0) {

                datosTercero.idTercero = user.idTercero;
                datosTercero.tipTercero = datos.tipTercero;
                datosTercero.nombre = datos.nombre;
                datosTercero.apePat = datos.apePat;
                datosTercero.apeMat = datos.apeMat; 
                datosTercero.razonSocial = datos.razonSocial;
                datosTercero.estadoT = datos.estadoT;
                datosTercero.telefono = datos.telefono;
                datosTercero.idPadre = datos.idPadre;
                datosTercero.idUsuAct = datos.idUsuAct;

                const tercero = await daoTercero.setTerceroActualizar(datosTercero);

                if (tercero.RSPTA == 0) {
                    Success(res, tercero, 201);
                } else {
                    Success(res, tercero,400);
                }
            } else {
                Error(res, user);
            } 
    } catch (error) {
        Error(res, error);
    }
}

ControllerUsuario.list = async (req, res) => {
    try {
        const idUser = req.params.idUsuario;
        const result = await daoUsuario.getUsuarioId(idUser);
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerUsuario.listTodo = async (req, res) => {
    try {
        const result = await daoUsuario.getUsuario();
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerUsuario.editEstado = async (req, res) => {
    try {
        const data = req.body;
        const user = await daoUsuario.setUsuarioEliminar(data);

        if (user) {
            Success(res, user, 201);
        } else {
            Error(res, user);

        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerUsuario.deleteUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.idUsuario;

        const user = await daoUsuario.setUsuarioEliminar(idUsuario);

        if (user.RSPTA == 0) {

            const tercero = await daoTercero.setTerceroEliminar(user.idTercero);

            if (tercero) {
                Success(res, tercero, 201);
            } else {
                Error(res, tercero);

            }
        } else {
            Error(res, user);
        }

    } catch (error) {
        Error(res, error);
    }
}

module.exports = ControllerUsuario;
