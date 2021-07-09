const moment = require("moment");

async function simuladorAcf(datos) {
    
    //correo dato de entrada
    let FV = moment(datos.fechaVencimiento, datos.formato).format(datos.formato);
    let FI = moment(datos.fechaIngreso, datos.formato).format(datos.formato); 
    let fvFecha = moment(FV,datos.formato);
    let fiFecha = moment(FI,datos.formato);
    let plazo = fvFecha.diff(fiFecha,'days');
    let TEA = parseFloat(datos.tasa); //dato de ingreso
    let MD = parseFloat(datos.monto);
    let I = (1-(1/Math.pow((1+TEA),(plazo/360))))*MD;
    let producto = datos.producto; 
    let IGV = 0;
    let valorIGV = parseFloat(datos.valorIGV);
    
    let G = parseFloat(datos.gastos);
    if(producto == 'FAC'){
        IGV = 0;
    }else{
        IGV = (I*valorIGV) + (G*valorIGV);
    }
    let TD = I+G+IGV; 
    const montoAbonar = parseFloat((MD-TD).toFixed(2));
    let datosSimulador = {};
    

    datosSimulador.interes = I.toFixed(2);
    datosSimulador.igv = IGV.toFixed(2);
    datosSimulador.td = TD.toFixed(2);
    datosSimulador.plazo = plazo;
    datosSimulador.valorIGV = valorIGV;
    datosSimulador.monto = montoAbonar.toFixed(2);
    datosSimulador.tasa = TEA;

    return datosSimulador
}


module.exports = { simuladorAcf}