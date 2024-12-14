const Station = require('../models/station.model');
const WaterFlowMedition = require('../models/waterFlowMedition.model')

exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().select('codigoObra itemInformeMedicion.caudal');;
    res.json(stations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', err });
  }
}

exports.getStationById = async (req, res) => {
  try {
    const { stationId } = req.params;
    
    console.log(stationId)
    const station = await Station.findOne({ codigoObra: stationId }).select('codigoObra itemInformeMedicion.caudal');

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json(station);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', err });
  }
};

exports.getWaterFlowByDateAndStationId = async (req, res) => {
  try {
    const { fecha_inicio, fecha_fin } = req.query;
    const { stationId } = req.params;
    console.log(stationId)

    const startDate = new Date(fecha_inicio);
    const endDate = new Date(fecha_fin);

    const waterFlowMeditions = await WaterFlowMedition.find({
      fechaHoraMedicion: { $gte: startDate, $lte: endDate },
      'obraCaptacion.codigo': stationId
    }).select('caudal fechaHoraMedicion');;

    if (!waterFlowMeditions) {
      return res.status(404).json({ message: 'No data found for the given parameters' });
    }

    res.json(waterFlowMeditions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', err });
  }
};
