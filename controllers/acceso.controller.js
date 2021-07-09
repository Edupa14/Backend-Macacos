const ControllerAcceso = {};
const { Success, Error } = require('../helper/Respuesta');
const daoAcceso = require('../dao/acceso.dao');
const daoTercero = require('../dao/tercero.dao');
const daoUsuario = require('../dao/usuario.dao');
const { agruparModulos} = require('../helper/Utilitarios');

ControllerAcceso.list= async (req, res) => {
    try {
        
        const idUser = req.params.idUsuario;
        let usuario = {};
        usuario = await daoUsuario.getUsuarioId(idUser)
        
        usuario.DatosPersonales = await daoTercero.getTerceroRol(usuario.idTercero);
        usuario.Accesos = await daoAcceso.getAccesoUsuario(idUser);
        if (usuario) {
            Success(res, usuario);
        } else {
            Success(res, usuario, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerAcceso.registrar = async (req, res) => {
    try {
        const datos = req.body;

        let accesos = [];
        let rol = datos[0].codRol;
        const result = await daoAcceso.getAccesoList(rol);
        if(result.length === 0){
            await Promise.all(datos.map(async function(item){

                let datosAccesos = {};
                    datosAccesos.codRol = item.codRol; 
                    datosAccesos.codModulo = item.codModulo;
                    datosAccesos.codSeccion = item.codSeccion;
                    datosAccesos.escritura = item.escritura;
                    datosAccesos.lectura = item.lectura;
                    datosAccesos.idUsuReg = item.idUsuReg;
                    datosAccesos.idUsuAct = item.idUsuAct;
                    let acceso = await daoAcceso.setAcceso(datosAccesos);
                    accesos.push(acceso);
               
            }));
            if (accesos.length > 0) {
                Success(res, accesos, 201);
            } else {
                Error(res, accesos);

            }
        }else{
            Success(res, 'Ya existe el codigo');
        }
        
        
    } catch (error) {
        Error(res, error);
    }
}

ControllerAcceso.listRol = async (req, res) => {
    try {
        const codRol = req.params.codRol;
        const result = await daoAcceso.getAccesoList(codRol);
        const rptaFinal = await agruparModulos(result);
        if (rptaFinal) {
            Success(res, rptaFinal); 
        } else {
            Success(res, rptaFinal, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}



ControllerAcceso.updateAcceso = async (req, res) => {
    try {
        const datos = req.body;

        let accesos = [];

        await Promise.all(datos.map(async function(item){

            let datosAccesos = {};

            datosAccesos.idAcceso = item.idAcceso;
            datosAccesos.codRol = item.codRol;
            datosAccesos.codModulo = item.codModulo;
            datosAccesos.codSeccion = item.codSeccion;
            datosAccesos.escritura = item.escritura;
            datosAccesos.lectura = item.lectura;
            datosAccesos.estado = item.estado;
            datosAccesos.idUsuAct = item.idUsuAct;

            let acceso = await daoAcceso.setAccesoEdit(datosAccesos);
            
            accesos.push(acceso);
        }));

        if (accesos.length > 0) {
            Success(res, accesos, 201);
        } else {
            Error(res, accesos);

        }
    } catch (error) {
        Error(res, error);
    }
}
ControllerAcceso.setAccesoEliminar = async(req, res) => {
    try {
        const codRol = req.params.codRol;
        
        const resultado = await daoAcceso.setAccesoElimina(codRol);
        if (resultado) {
            Success(res, resultado);
        } else {
            Success(res, resultado, 204);
        }

    } catch (error) {
        Error(res, error);
    }
}; 

module.exports = ControllerAcceso;