const ControllerNotificacion = {};
const { Success, Error } = require('../helper/Respuesta');
const daoNotificacion = require('../dao/notificacion.dao');
const moment = require("moment");
var nodemailer = require('nodemailer');


ControllerNotificacion.list = async (req, res) => {
    try {
        const param = req.body;

        const result = await daoNotificacion.listNotificaciones(param);
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {

        Error(res, error);
    }
}

ControllerNotificacion.listId = async (req, res) => {
    try {
        const idNotificacion = req.params.idNotificacion;
        const result = await daoNotificacion.listNotificacion(idNotificacion);
        if (result) {
            Success(res, result);
        } else {
            Success(res, result, 204);
        }
    } catch (error) {
        Error(res, error);
    }
}

ControllerNotificacion.registrar = async (req, res) => {
    try {
        const datos = req.body;

        let datosNotificaciones = {};

        datosNotificaciones.idUsuario = datos.idUsuario;
        datosNotificaciones.notificacion = datos.notificacion;
        datosNotificaciones.tipNotEtiqueta = datos.tipNotEtiqueta;
        datosNotificaciones.asunto = datos.asunto;
        datosNotificaciones.de = datos.de;
        datosNotificaciones.para = datos.para;
        datosNotificaciones.cc = datos.cc;
        datosNotificaciones.cco = datos.cco;
        datosNotificaciones.mensaje = datos.mensaje;
        datosNotificaciones.tipNotif = datos.tipNotif;
        datosNotificaciones.fecDesde = datos.fecDesde;
        datosNotificaciones.fecHasta = datos.fecHasta;

        const notificaciones = await daoNotificacion.setNotificacionCrear(datosNotificaciones);

        if (notificaciones.idNotificacion > 0) {
            Success(res, notificaciones, 201);
        } else {
            Error(res, notificaciones);
        }

    } catch (error) {
        Error(res, error);
    }
}

ControllerNotificacion.editar = async (req, res) => {
    try {
        const datos = req.body;

        let datosNotificaciones = {};

        datosNotificaciones.idNotificacion = datos.idNotificacion;
        datosNotificaciones.notificacion = datos.notificacion;
        datosNotificaciones.asunto = datos.asunto;
        datosNotificaciones.para = datos.para;
        datosNotificaciones.cc = datos.cc;
        datosNotificaciones.cco = datos.cco;
        datosNotificaciones.mensaje = datos.mensaje;
        datosNotificaciones.fecDesde = datos.fecDesde;
        datosNotificaciones.fecHasta = datos.fecHasta;
        datosNotificaciones.estadoNot = datos.estadoNot;
        datosNotificaciones.estado = datos.estado;

        const notificaciones = await daoNotificacion.setNotificacionEditar(datosNotificaciones);
        if (notificaciones.RSPTA == 0) {
            Success(res, notificaciones, 201);
        }else{
            Error(res, notificaciones);

        }

    } catch (error) {
        Error(res, error);
    }
}
ControllerNotificacion.editEstado = async (req, res) => {
    try {
        const idNotificacion = req.params.idNotificacion;
        const notificacion = await daoNotificacion.setNotificacionEliminar(idNotificacion);
        
        if (notificacion) {
            Success(res, notificacion, 201);
        } else {
            Error(res, notificacion);

        }
    } catch (error) {
        Error(res, error);
    }
}


ControllerNotificacion.envioCorreoLiquidacion = async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: "siberia.gonzalez@hackmonkeys.com", 
            pass: "hackmonkey.10", 
        },
    });
        const liquidacion = req.body;
        let datosNotificaciones = {};
        datosNotificaciones.correo = liquidacion.correo;
        let pdf;
        pdf = liquidacion.pdf;
        let info = await transporter.sendMail({
            from: '"Siberia Gonzalez" <siberia.gonzalez@hackmonkeys.com>',
            //to: "siberia.gonzalez@hackmonkeys.com",
            to: liquidacion.correo,
            subject: "Liquidación", 
            html: "Adjunto documento de liquidación",
            attachments: [
                {   // data uri as an attachment
                    path: pdf
                }
            ],
            });


    } catch (error) {
        console.log("Error", error);
    }
}

ControllerNotificacion.envioCorreo = async (req, res) => {
    try {
        let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
            user: "siberia.gonzalez@hackmonkeys.com", 
            pass: "hackmonkey.10", 
        },
    });
        const sponsor = req.body;
        let datosNotificaciones = {};
        datosNotificaciones.tipNotEtiqueta = sponsor.plantilla;
        let pdf;
        pdf = sponsor.pdf;
        const result = await daoNotificacion.listNotificaciones(datosNotificaciones);
        if (result) {
            Success(res, result);
            var str = result[0].mensaje;
            var mapObj = {
                '{{interes}}':sponsor.interes,
                '{{IGV}}':sponsor.igv,
                '{{Total}}': sponsor.total,
                '{{MontoAbonar}}': sponsor.monto,
                '{{sponsor.nombre}}' : sponsor.razonSocial,
             };
             var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
             str = str.replace(re, function(matched){
               return mapObj[matched];
             });
            let info = await transporter.sendMail({
                from: '"Siberia Gonzalez" <siberia.gonzalez@hackmonkeys.com>',
                to: sponsor.correo,
                subject: result[0].asunto, 
                html: str,
                attachments: [
                    {   // data uri as an attachment
                        path: pdf
                    }
                ],
                });
            
            } else {
                Success(res, result, 204);
            }


    } catch (error) {
        console.log("Error", error);
    }
}
module.exports = ControllerNotificacion;