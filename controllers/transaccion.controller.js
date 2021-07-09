const transaccionController = {};
const { Success, Error } = require('../helper/Respuesta');
const { agruparMonedas, isNumeric } = require('../helper/Utilitarios');
const { simuladorAcf } = require('../helper/UtilAcf');
const daoTercero = require('../dao/tercero.dao');
const daoSponsor = require('../dao/sponsor.dao');
const daoDocumento = require('../dao/documento.dao');
const daoTransaccion = require('../dao/transaccion.dao');
const daoLiquidacion = require('../dao/liquidacion.dao');
const daoValor = require('../dao/valor.dao');
const path = require("path");
const moment = require("moment");
const ruta = path.join(__dirname.split("Controllers")[0]);
//const excel = require('exceljs');
const excel = require('xlsx');
const { promises } = require('fs');

transaccionController.subirArchivo = (req, res) => {
  try {
      if (req.files) {
        Error(res)
          const transaccion = req.files;

          /*console.log(req.files)
          console.log("esta dentro")*/

          Success(res, 204);
         /* const resultado = await daoTransaccion.agregarArchivo(transaccion);
          if (resultado) {
              Success(res, resultado);
          } else {
              Success(res, resultado, 204);
          }*/
      }else{
          Success(res, 204);
      }
  } catch (error) {
      Error(res, error);

  }
}
const obtenerMontoTotalPlanilla = (resultado)=>{
  let objMonto = {
    monto: 0.0,
    moneda: ''
  }
  // resultado.map(data, index => {
  //     let stringMonto = data.mtoPlanilla.split('|');
  //     stringMonto =  stringMonto.split(':')
  //     console.log("obtenerMontoTotalPlanilla -> stringMonto", stringMonto)
      
  // })
  return 0
}

const obtenerConfigSponsor = async (data)=>{
  let configSponsor = {
    cobroMinimo: 0.0,
    montoMaximo: 0.0,
    tea: 0.0
  }
  
  await Promise.all(data.map(async (conf, index) => {
    switch (conf.codConfig) {
      case 'TEA':
        configSponsor.tea = parseFloat(conf.valor)
        break
      case 'MMAX':
        configSponsor.montoMaximo = parseFloat(conf.valor)
        break
      case 'CMIN':
        configSponsor.cobroMinimo = parseFloat(conf.valor)
        break
      case 'MON':
          configSponsor.moneda = conf.valor
          break
      default:
        break
    }
  }));
  return configSponsor;
}

transaccionController.procesarPlanilla = async (req, res) => {
  try {
    if (req.files) {
      let resumen = [];
      let resultado = { numOpeGlobal: '', numOpeSponsor: '', fechaRegistro: '', montosTotales: '', resumen: resumen };
      const archivo = req.files.excel;
      const datos = JSON.parse(req.body.Datos);
      const numeroOperacion = await daoTransaccion.getNumOperacion();
      var woorkbook = excel.read(archivo.data, { type: 'buffer', cellDates: true });
      var sheet_name_list = woorkbook.SheetNames;
      const data = excel.utils.sheet_to_json(woorkbook.Sheets[sheet_name_list[0]]);
      let datas = {}
      datas.idSponsor = datos.idSponsor
      datas.fila = datos.fila
      datas.pagina = datos.pagina
      let lista = await daoTransaccion.listarPlanilla(datas)
      let montoTotalPlanilla = await obtenerMontoTotalPlanilla(lista)
      let config = {}
      config.idSponsors = datos.idSponsor
      config.estado = 'ACT'
      config.producto = datos.codProd
      let result = await daoSponsor.listarConfig(config)
      let configSponsor = await obtenerConfigSponsor(result)
      let val = await daoValor.listarValor('IGV')
      let IGV = 0;
      await Promise.all(val.map(async (valor, index) => {
        IGV = parseFloat(valor.valor);
      }));
      //Validaciones Excel
      let c = 0;
      let moneda = await agruparMonedas(data);
      let montosTotales = '';
      await Promise.all(moneda.map(async (row, index) => {
        let total = 0;
        await Promise.all(row.moneda.map(async (mon, index) => {
          total = total + mon.IMP_DOC;
        }));
        row.total = total.toFixed(2);
        montosTotales = montosTotales + row.MON + ':' + row.total + '|';
      }));
      resultado.montosTotales = montosTotales
      await Promise.all(data.map(async (row, index) => {
        let datas = {};
        let transaccion = {};
        let liquidacion = {};
        let documento = {};
        documento.tipoDoc = row.T_DOC;
        documento.numDoc = row.DOC;
        documento.fechaEmision1 = row.FE_EMISION;
        documento.fechaVencimiento1 = row.FE_VCMTO;
        documento.fechaEmision = moment(documento.fechaEmision1, 'DD-MM-YYYY').format('DD-MM-YYYY');
        documento.fechaVencimiento = moment(documento.fechaVencimiento1, 'DD-MM-YYYY').format('DD-MM-YYYY');
        documento.tipoMoneda = row.MON;
        documento.montoDoc = row.IMP_DOC;
        liquidacion.tipoProducto = datos.codProd; //liquidacion
        liquidacion.numOperacion = numeroOperacion.numOpeGlobal; //liquidacion
        transaccion.numOperacion = numeroOperacion.numOpeGlobal;
        liquidacion.idSponsor = datos.idSponsor; //liquidacion
        liquidacion.idUsuario = datos.idUsuario //liquidacion 
        transaccion.numDoc = row.DOC;
        montoDocs = row.IMP_DOC;
        transaccion.montoDoc = montoDocs.toFixed(2)
        transaccion.idUsuario = datos.idUsuario;
        transaccion.mtoNetoFinan = 0
        transaccion.mtoTotFacDesc = 0;
        transaccion.mtoTea = 0;
        documento.razonSocial = row.CLIENTE;
        documento.idUsuario = datos.idUsuario;
        documento.ruc = row.RUC;
        datas.ruc = documento.ruc;
        datas.verifica = 1;
        const ruc = await daoSponsor.ListarSponsorXruc(datas);
        if (isNumeric((row.RUC).toString()) === false) {
          transaccion.observacion = 'EL RUC DEBE SER SOLO LETRAS';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        }
        else if (ruc === undefined) {
          transaccion.observacion = 'PROVEEDOR NO REGISTRADO';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        }
        else if ((row.RUC).toString().length !== 11) {
          transaccion.observacion = 'RUC DEBE TENER 11 DIGITOS';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        } else if (row.FE_EMISION > moment()) {
          transaccion.observacion = 'FECHA DE EMISION NO PUEDE SER MAYOR A LA FECHA ACTUAL';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        } else if (row.FE_VCMTO < row.FE_EMISION || row.FE_VCMTO === row.FE_EMISION) {
          transaccion.observacion = 'FECHA DE VENCIMIENTO DEBE SER MAYOR A LA FECHA DE EMISION';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        } else if (row.FE_VCMTO < moment()) {
          transaccion.observacion = 'FECHA DE VENCIMIENTO DEBE MAYOR A LA FECHA ACTUAL';
          transaccion.condicion = 'NO REGISTRADO'
          c++;
        } else {
          transaccion.observacion = 'VALIDADO';
          transaccion.condicion = 'NO REGISTRADO'
        }
        resumen.push({
          tipoDoc: documento.tipoDoc, numDoc: documento.numDoc, fechaEmision: documento.fechaEmision1,
          fechaVencimiento: documento.fechaVencimiento1, tipoMoneda: documento.tipoMoneda, tipoProducto: liquidacion.tipoProducto,
          montoDoc: transaccion.montoDoc, razonSocial: documento.razonSocial, ruc: documento.ruc, idProveedor: 7,
          idUsuario: documento.idUsuario, condicion: transaccion.condicion, emision: documento.fechaEmision,
          vencimiento: documento.fechaVencimiento, observacion: transaccion.observacion
        })
      }));
      if (c === 0) {
        let liquidacion = {};
        liquidacion.tipoProducto = datos.codProd;
        liquidacion.idUsuario = datos.idUsuario;
        liquidacion.idSponsor = datos.idSponsor;
        liquidacion.mtoPlanilla = montosTotales;
        liquidacion.tea = configSponsor.tea;
        const liq = await daoLiquidacion.postLiquidacionCrear(liquidacion);
        if (liq.RSPTA === 0) {
          resultado.numOpeGlobal = liq.numOperacion
          resultado.numOpeSponsor = liq.numOpeSponsor
          resultado.fechaRegistro = moment(liq.fechaActual).format('DD-MM-YYYY')

          await Promise.all(resumen.map(async (transaccion, index) => {
            transaccion.numOperacion = liq.numOperacion;
            let datos = {};
            datos.fechaVencimiento = transaccion.fechaVencimiento;
            datos.fechaIngreso = transaccion.fechaEmision;
            datos.tasa = configSponsor.tea;//TRAER DE UNA CONFIGURACION
            datos.monto = transaccion.montoDoc;
            datos.producto = transaccion.tipoProducto;
            datos.valorIGV = IGV;//TRAER DE UNA CONFIGURACION
            datos.gastos = 0;//CONSULTAR A ROSALINDA
            datos.formato = 'DD-MM-YYYY';
            const simulador = await simuladorAcf(datos);
            /*simulador.interes = I.toFixed(2);
            simulador.igv = IGV.toFixed(2);
            simulador.td = TD.toFixed(2);
            simulador.plazo = plazo;
            simulador.monto = montoAbonar.toFixed(2);*/
            transaccion.mtoTea = simulador.interes; //TRANSACCION
            transaccion.igv = parseFloat(simulador.igv); //DOCUMENTO
            transaccion.mtoTotFacDesc = simulador.td; //TRANSACCION
            transaccion.plazo = simulador.plazo;//TRANSACCION
            transaccion.mtoNetoFinan = simulador.monto;//TRANSACCION
            const doc = await daoDocumento.postDocumentoCrear(transaccion);
            if (doc.RSPTA == 0) {
              transaccion.idLiquidacion = liq.idLiquidacion
              const transac = await daoTransaccion.postTransaccionCrear(transaccion);
              if (transac.RSPTA === 0) {
                transaccion.numRegUnico = transac.numeroUnico
                transaccion.condicion = 'REGISTRADO';
              } else {
                transaccion.condicion = 'RECHAZADO';
              }
            } else {
              transaccion.observacion = 'NO REGISTRADO'
              transaccion.condicion = 'DOCUMENTO REPETIDO';
            }
          }));
        }
      }
      resultado.resumen = resumen;
      if (resumen) {
        Success(res, resultado);
      } else {
        Error(res, resultado, 400);
      }

    }
  } catch (error) {
    Error(res, error);
  }
}

transaccionController.ObtenerPlanilla = async (req, res) => {
  try {
    const plantilla = req.body;
    const resultado = await daoTransaccion.listarPlanilla(plantilla);
    let paginado = (resultado.filas / plantilla.fila)
    let entero = 0;

    if (paginado % 1 === 0) {
      resultado.paginado = paginado;
    } else {
      entero = paginado;
      resultado.paginado = parseInt(entero) + 1;
    }

    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

transaccionController.ListarTransaccion = async (req, res) => {
  try {
    const transaccion = req.body;
    const resultado = await daoTransaccion.buscarTransaccion(transaccion);
    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

transaccionController.ObtenerRuc = async (req, res) => {
  try {
    const idSponsor = req.params.idSponsor;
    const resultado = await daoTransaccion.buscarRUC(idSponsor);
    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

module.exports = transaccionController;
