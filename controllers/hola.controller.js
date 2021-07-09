const ControladorHola = {};

const daoHola = require('../dao/hola.dao');

ControladorHola.obtenerRespuesta = async(req, res) => {

    daoHola.obtenerRespuesta()
        .then(resp => {
            const data = resp.recordset;

            if (data.length > 0) {                
                res.status(200).json({ data });
            } else {  
                res.status(204).json({ data });
            }
        })
        .catch(error => {  
            res.status(500).json({ error });
        });

};

module.exports = ControladorHola;