// async function agruparModelos(data) {
    
//     let result = await Promise.all(Array.from(new Set(data.map(s => s.Modelo))).map(Modelo => {
//         return { 
//             modelo: data.find(s => s.Modelo === Modelo).Modelo 
//         }
//     }));

//     return result
//}

function validarNulo(filtros){
    if(filtros != "undefined" && filtros != ''){
        return true;
    }else{
        return false;
    }
}


function filtrar(array, key, value) {
    return array.filter(function(e) {
        return e[key] == value;
    });
}

async function agruparModulos(data) {
    
    let result = await Promise.all(Array.from(new Set(data.map(s => s.codModulo))).map(codModulo => {
        return { 
            codModulo: data.find(s => s.codModulo === codModulo).codModulo,
            Modulo: data.find(s => s.codModulo === codModulo).Modulo
        }
    }));

    await Promise.all(result.map(async(row, index) => {
        result[index].secciones = filtrar(data, "codModulo", row.codModulo);
    }));

    return result
}

function isNumeric(str) {
    if (typeof str != "string") return false 
    if (!isNaN(str) && !isNaN(parseFloat(str))) {
      let parse = +str;
      if (Math.sign(parse) === 1) {
        return parse;
      }
      return false;
    }
    return false
  }

async function agruparMonedas(data) {
    
    let result = await Promise.all(Array.from(new Set(data.map(s => s.MON))).map(MON => {
        return { 
            MON: data.find(s => s.MON === MON).MON,
        }
    }));

    await Promise.all(result.map(async(row, index) => {
        result[index].moneda = filtrar(data, "MON", row.MON);
    }));

    return result
}

// async function agruparOficinasZona(data) {

//     let result = await Promise.all(Array.from(new Set(data.map(s => s.Zona))).map(Zona => {
//         return { 
//             Zona: data.find(s => s.Zona === Zona).Zona 
//         }
//     }));
    
//     await Promise.all(result.map(async(row, index) => {
//         result[index].oficinas = filtrar(data, "Zona", row.Zona);
//     }));
    
//     return result
// }

// function ordenarOficinas(data) {
//     let dataResult

//     dataResult = {
//         "Norte": filtrar(data, "Zona", "Norte"),
//         "Centro": filtrar(data, "Zona", "Centro"),
//         "Sur": filtrar(data, "Zona", "Sur"),
//         "Metropolitana": filtrar(data, "Zona", "Metropolitana"),
//         "Austral": filtrar(data, "Zona", "Austral")
//     }

//     if (dataResult['Norte'].length == 0) {
//         delete dataResult['Norte']
//     }
//     if (dataResult['Centro'].length == 0) {
//         delete dataResult['Centro']
//     }
//     if (dataResult['Sur'].length == 0) {
//         delete dataResult['Sur']
//     }
//     if (dataResult['Metropolitana'].length == 0) {
//         delete dataResult['Metropolitana']
//     }
//     if (dataResult['Austral'].length == 0) {
//         delete dataResult['Austral']
//     }

//     return dataResult
// }

module.exports = { agruparModulos, validarNulo, agruparMonedas, isNumeric}