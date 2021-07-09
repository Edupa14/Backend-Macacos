const sponsorController = {};
const { Success, Error } = require('../helper/Respuesta');
const daoSponsor = require('../dao/sponsor.dao');
const daoTercero = require('../dao/tercero.dao');

sponsorController.listadoSponsor = async (req, res) => {
  try {
    const sponsor = req.body;
    const resultado = await daoSponsor.ListarSponsor(sponsor);
    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

sponsorController.listadoSponsorXId = async (req, res) => {
  try {
    const sponsor = req.body;
    const resultado = await daoSponsor.ListarSponsorXId(sponsor);
    if (resultado) {
      resultado.responsables = await daoSponsor.listarResponsables(resultado.idTercero);
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

sponsorController.listadoSponsorXruc = async (req, res) => {
  try {
    const ruc = req.params.ruc;
    let resultado = await daoSponsor.ListarSponsorXruc(ruc);
    if (resultado) {
      resultado.responsables = await daoSponsor.listarResponsables(resultado.idTercero);
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

sponsorController.deleteProveedorId = async (req, res) => {
  try {
    const idSponsor = req.params.idSponsor;
    let resultado = await daoSponsor.deleteProveedorId(idSponsor);
    if (resultado) {
      //resultado.responsables = await daoSponsor.listarResponsables(resultado.idSponsor);
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

sponsorController.listadoConfig = async (req, res) => {
  try {
    const datos = req.body;
    const resultado = await daoSponsor.listarConfig(datos);
    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}
sponsorController.update = async (req, res) => {
  try {
    const datos = req.body;
    let datoSConfig = {}
    let datosC = []

    datoSConfig.idSponsor = datos[0].idSponsor;
    datoSConfig.codProducto = datos[0].codProducto;
    datoSConfig.idUsuAct = datos[0].idUsuario;

    let result = await daoSponsor.updateConfig(datoSConfig);
    await Promise.all(datos.map(async (element, index) => {

      let datosConfig = {};

      datosConfig.idSponsor = element.idSponsor;
      datosConfig.codProducto = element.codProducto;
      datosConfig.codConfigProducto = element.idParametro;
      datosConfig.valor = element.valor;
      datosConfig.idUsuReg = element.idUsuario;
      datosConfig.idUsuAct = element.idUsuario;
      let resultado = await daoSponsor.createConfig(datosConfig);
      datosC.push(resultado)
    }));


    if (datosC.length > 0) {
      Success(res, datosC, 201);
    } else {
      Error(res, datosC);
    }

  } catch (error) {
    Error(res, error);
  }
}

sponsorController.listadoSponsorPrograma = async (req, res) => {
  try {
    const datos = req.body;
    let resultado = await daoSponsor.listarSponsorPrograma(datos);
    if (resultado) {
      Success(res, resultado);
    } else {
      Success(res, resultado, 204);
    }
  } catch (error) {
    Error(res, error);
  }
}

sponsorController.registrarSponsor = async (req, res) => {
  try {
    const datos = req.body;
   if(datos.idSponsorExiste === 0){
    let datosTercero = {};

    datosTercero.tipTercero = 'JUR';
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
    
    if (tercero.idTercero > 0) {
      let datosSponsor = {}
      datosSponsor.idUsuReg = datos.idUsuReg;
      datosSponsor.idUsuAct = datos.idUsuAct;
      datosSponsor.idTercero = tercero.idTercero;
      datosSponsor.sector = '-';
      datosSponsor.tipo = 'PROV';
      datosSponsor.codPrograma = datos.codPrograma;
      const resultado = await daoSponsor.postSponsor(datosSponsor);
      
      
      if (resultado.idSponsor > 0) {
        if(datosSponsor.codPrograma === 'FICO'){
          let datosProv = {}
          datosProv.idSponsor = resultado.idSponsor
          datosProv.idProveedor= datos.idSponsor
          
          const resul = await daoSponsor.postSponsorProv(datosProv);
          
          
          if (resultado) {
            Success(res, resultado);
          } else {
            Success(res, resultado, 204);
          }
        } 
        if (datosSponsor.codPrograma === 'FIVE'){
          let datosProv = {}
          datosProv.idSponsor = datos.idSponsor
          datosProv.idProveedor= resultado.idSponsor
          const resul = await daoSponsor.postSponsorProv(datosProv);
          if (resultado) {
            Success(res, resultado);
          } else {
            Success(res, resultado, 204);
          }
        } 
                
      } else {
        Error(res, resultado, 204);
      }
    } else {
      Error(res, tercero);

    }

   }else{
     console.log(datos,'00')
    let datosSponsor = {}
      datosSponsor.idUsuReg = datos.idUsuReg;
      datosSponsor.idUsuAct = datos.idUsuAct;
      datosSponsor.idTercero = datos.idTercero;
      datosSponsor.sector = '-';
      datosSponsor.tipo = 'PROV';
      datosSponsor.codPrograma = datos.codPrograma;
      datosSponsor.numeroDoc = datos.numeroDoc
      console.log(datosSponsor,'datosponsor')
      const resultado = await daoSponsor.postSponsor(datosSponsor);
      console.log(resultado,'resultado')
      if (resultado.idSponsor > 0) {
        if(datosSponsor.codPrograma === 'FICO'){
          let datosProv = {}
          datosProv.idSponsor = resultado.idSponsor
          datosProv.idProveedor= datos.idSponsor
          const resul = await daoSponsor.postSponsorProv(datosProv);
          if (resultado) {
            Success(res, resultado);
          } else {
            Success(res, resultado, 204);
          }
        } 
        if (datosSponsor.codPrograma === 'FIVE'){
          let datosProv = {}
          datosProv.idSponsor = datos.idSponsor
          datosProv.idProveedor= resultado.idSponsor
          const resul = await daoSponsor.postSponsorProv(datosProv);
          if (resultado) {
            Success(res, resultado);
          } else {
            Success(res, resultado, 204);
          }
        } 
    } 
}
    

  } catch (error) {
    Error(res, error);
  }
}

module.exports = sponsorController;