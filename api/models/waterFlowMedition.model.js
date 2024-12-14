const mongoose = require('mongoose');

const obraCaptacionSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    modifiedOn: Date,
    modifiedByRut: String,
    tipoObra: Number,
    codigo: String,
    ubicacion: {
      region: {
        codigo: Number,
        nombre: String,
        provincias: [String]  // Assuming it's an array of provinces
      },
      provincia: String,
      comuna: String,
      coordenadas: [Number]
    },
    medicion: {
      id: Number,
      modifiedOn: Date,
      modifiedByRut: String,
      mideMismoLugar: Boolean,
      ubicacionMedicion: String,
      mideAguas: Boolean,
      frecuencia: String,
      frecuenciaOtro: String,
      comoMide: String,
      comoMideOtro: String,
      telemetria: Boolean,
      sistemaOcupado: Boolean,
      pce: String,
      nroPce: String,
      mideNivelPozo: Boolean,
      frecuenciaPozo: String,
      frecuenciaPozoOtro: String,
      comoMidePozo: String,
      comoMidePozoOtro: String,
      pozometroDatalogger: Boolean,
      sistemaMedicion: String,
      sistemaMedicionOtro: String,
      revestimientoCanal: String,
      revestimientoCanalOtro: String,
      curvaDescarga: String,
      alturaLimninetrica: Number,
      alturaLimninetricaOtro: String,
      dataLoggerSensorlimnimetrica: String,
      libroRegistro: String,
      caudalCauseNatural: Boolean
    },
    fechaEmision: Date,
    informante: String,
    cuenca: String,
    subcuenca: String,
    subsubcuenca: String,
    fuenteSuperficial: String,
    estandarObra: String,
    estandarCasoEspecial: String,
    junta: String,
    representaJunta: String,
    parteJunta: String,
    naturaleza: {
      clave: Number,
      valor: String
    },
    caracteristicas: String,
    derecho: String,
    datosInstalacion: {
      id: String,
      modifiedOn: Date,
      modifiedByRut: String,
      bomba: String,
      medidores: [String],
      docInstalacion: String,
      distFlujometroObra: String,
      dispTuberia: String,
      materialTub: String,
      arribaSingularidad: String,
      arribaDistancia: String,
      arribaDiametro: String,
      abajoSingularidad: String,
      abajoDistancia: String,
      abajoDiametro: String
    },
    obrasVecinas: [String],
    documentos: String,
    derechoObra: String,
    idFotoObra: String,
    nombreFotoObra: String,
    estadoObra: String,
    motivoCambioEstado: String,
    fechaCambioEstado: Date,
    check: Boolean,
    motivoCambioInformante: String,
    datosCompletos: Boolean,
    usuarios: [String],
    tieneDerechoVinculado: Boolean,
    nombreObra: String,
    ubicacionHidrologica: String,
    itemInformeMedicion: String,
    msgSeccionesIncompletas: String,
    seccionesCompletas: Boolean
  }, { _id: false });
  
  const waterFlowMeditionSchema = new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false
    },
    modifiedOn: Date,
    modifiedByRut: String,
    codObra: String,
    fechaHoraMedicion: {
      type: Number,
      required: true
    },
    fechaMedicion: {
      type: Date,
    },
    horaMedicion: String,
    fechaHoraOrigen: Date,
    caudal: {
      type: Number,
      required: true
    },
    alturaLimnimetrica: Number,
    totalizador: Number,
    nivelFreatico: Number,
    estadoValidez: {
      type: Boolean,
      default: false
    },
    estadoMensaje: String,
    obraCaptacion: {
      type: obraCaptacionSchema,
      required: true
    },
    puntoRestitucion: String,
    caudalTotalCPA: Number,
    caudalTotalDeclarado: Number,
    volumenTotalCPA: Number,
    volumenTotalDeclarado: Number,
    volumenAnualExtraido: Number,
    caudalMedioMensual: Number,
    primeraMedicionDelMes: Boolean,
    canalTransmision: String,
    canalTransmisionGlosa: String,
    numeroComprobante: String
  });
  
  // Create a model from the schema
  const WaterFlowMedition = mongoose.model('WaterFlowMedition', waterFlowMeditionSchema);
  
  module.exports = WaterFlowMedition;