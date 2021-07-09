const { SqlConnection, sql } = require('../conexion/conexion');

async function postSponsor(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idUsuReg', sql.Int, datos.idUsuReg);
        request.input('idUsuAct', sql.Int, datos.idUsuAct);
        request.input('idTercero', sql.Int, datos.idTercero);
        request.input('sector', sql.VarChar(5), datos.sector);
        request.input('tipo', sql.VarChar(4), datos.tipo);
        request.input('ruc', sql.VarChar(11), datos.numeroDoc);

        const { recordset: resultado } = await request.execute('administrativo.registrarSponsor');
        return resultado[0];
    } catch (error) {
        return error;
    }
} 

async function postSponsorProv(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('idProveedor', sql.Int, datos.idProveedor);
        const { recordset: resultado } = await request.execute('administrativo.registrarSponsorProv');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function ListarSponsor(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        if (datos.idSponsor) {
            request.input('idSponsor', sql.Int, datos.idSponsor);
            request.input('codPrograma', sql.VarChar(5), datos.codPrograma);
            request.input('estado', sql.VarChar(4), datos.estado);
        }
        const { recordset: resultado } = await request.execute('administrativo.listarSponsorProveedor');
        return resultado;
    } catch (error) {
        return error;
    }
}


async function ListarSponsorXId(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('estado', sql.VarChar(4), datos.estado);
        const { recordset: resultado } = await request.execute('administrativo.listarSponsorXId');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function deleteProveedorId(idSponsor) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, idSponsor);
        const { recordset: resultado } = await request.execute('administrativo.editEstadoProveedor');
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function listarResponsables(idTercero) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idTercero', sql.Int, idTercero);
        const { recordset: resultado } = await request.execute('administrativo.listaResponsablesEmpresa');
        return resultado;
    } catch (error) {
        return error;
    }
}

async function ListarSponsorXruc(data) {

    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        if(data.ruc){
            request.input('ruc', sql.VarChar(11), data.ruc);
            request.input('verificarProveedor', sql.Int, data.verifica);
        }else{
            request.input('ruc', sql.VarChar(11), data);
        }
        const { recordset: resultado } = await request.execute('administrativo.listarSponsorXruc');
        console.log(data,'result')
        return resultado[0];
    } catch (error) {
        return error;
    }
}

async function listarConfig(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsors', sql.Int, datos.idSponsors);
        request.input('estado', sql.VarChar(4), datos.estado);
        request.input('producto', sql.VarChar(4), datos.producto);
        const { recordset: resultado } = await request.execute('administrativo.listarConfigSponsors');

        return resultado;
    } catch (error) {
        return error;
    }
}

async function createConfig(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('codProducto', sql.VarChar(5), datos.codProducto);
        request.input('codConfigProducto', sql.Int, datos.codConfigProducto);
        request.input('valor', sql.VarChar(30), datos.valor);
        request.input('idUsuReg', sql.Int, datos.idUsuReg);
        request.input('idUsuAct', sql.Int, datos.idUsuAct);
        const { recordset: resultado } = await request.execute('administrativo.registroConfigSponsor');
        return resultado[0];
    } catch (error) {
        return error;
    }
}
async function updateConfig(datos) {
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('codProducto', sql.VarChar(5), datos.codProducto);
        request.input('idUsuario', sql.Int, datos.idUsuario);
        const { recordset: resultado } = await request.execute('administrativo.updateConfigSponsor');
        return resultado[0];
    } catch (error) {
        return error;
    }
}
 
async function listarSponsorPrograma(datos) {  
    try {
        const conexion = await SqlConnection;
        const request = await conexion.request();
        request.input('idSponsor', sql.Int, datos.idSponsor);
        request.input('codPrograma', sql.VarChar(5), datos.codPrograma);
        request.input('estado', sql.VarChar(4), datos.estado);
        const { recordset: resultado } = await request.execute('administrativo.litarSponsorPrograma');
        return resultado;
    } catch (error) {
        return error;
    }
}

module.exports = {
    postSponsor,postSponsorProv, deleteProveedorId, ListarSponsorXId,ListarSponsor, ListarSponsorXruc, listarResponsables, listarConfig, createConfig, updateConfig, listarSponsorPrograma
}