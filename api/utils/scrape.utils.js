const axios = require('axios');
const Station = require('../models/station.model');

const processStationsIds = async (stationId, headers) => {
    try {
        const getStationByIdPayload = { "data": { "id": null, "codigoObra": stationId, "region": null, "provincia": null, "comuna": null, "naturaleza": null, "tipoObra": null, "cuenca": null, "subCuenca": null, "subSubCuenca": null, "acuifero": null, "sectorSha": null, "estadoObra": null, "tipoOua": null, "oua": null, "estadoFiscalizacion": null, "caudalObraMinimo": null, "caudalObraMaximo": null, "tipoAlerta": { "id": null, "tipoAlerta": null, "descripcion": null, "activada": null, "mensaje": null, "margenError": null, "porcentajeEvento": null, "nivel": null, "notificaUsuario": null, "naturaleza": null, "aplica": null }, "tipoUsuarioObra": null, "rutUsuarioObra": null, "nombreUsuarioObra": null, "rutUsuarioInformante": null, "nombreUsuarioInformante": null, "caudalCPAMinimo": null, "caudalCPAMaximo": null, "obraHabilitada": null, "fechaDesde": null, "fechaHasta": null, "estadoAlerta": null, "tipoDerecho": null, "onlyRestituibles": null, "conAlertas": null, "conFiscalizacion": null, "regionRepRegional": null, "juntaVigilancia": null, "asociacionCanalista": null, "comunidadAgua": null, "casub": null, "juntasVigilancia": [], "casubs": [], "canalistas": [], "comunidadesAgua": [], "fechaDesdeAlerta": null, "fechaHastaAlerta": null, "utmNorte": null, "utmEste": null, "huso": null, "distancia": null, "criterioBusqueda": null, "msg": [] } }

        const getStationByIdResponse = await axios.post(
            'https://snia.mop.gob.cl/extracciones/data/obraCaptacion/obtenerObraResumen',
            getStationByIdPayload,
            headers
        )
        await Station.findOneAndUpdate(
            { codigoObra: getStationByIdResponse.data.data.codigoObra },
            getStationByIdResponse.data.data,
            { new: true, upsert: true, runValidators: true }
        );

        return getStationByIdResponse.data.data;

    } catch (err) {
        console.error(err);
        throw Error;
    }
}

module.exports = {
    processStationsIds
};