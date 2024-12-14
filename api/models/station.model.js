const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
  clave: { type: Number },
  valor: { type: String },
});

const ItemInformeMedicionSchema = new mongoose.Schema({
  id: { type: Number, default: null },
  modifiedOn: { type: Date, default: null },
  modifiedByRut: { type: String, default: null },
  codObra: { type: String, default: null },
  fechaHoraMedicion: { type: Date, default: null },
  fechaMedicion: { type: String, default: null },
  horaMedicion: { type: String, default: null },
  caudal: { type: Number, default: null },
  alturaLimnimetrica: { type: Number, default: null },
  totalizador: { type: Number, default: null },
  nivelFreatico: { type: Number, default: null },
  estadoValidez: { type: Boolean, default: false },
  estadoMensaje: { type: String, default: null },
});

const TipoDerechoSchema = new mongoose.Schema({
  clave: { type: Number },
  valor: { type: String },
});

const DerechoObraSchema = new mongoose.Schema({
  id: { type: Number },
  tieneDerecho: { type: String },
  tipoDerecho: { type: TipoDerechoSchema },
  ene: { type: Number, default: 0 },
  feb: { type: Number, default: 0 },
  mar: { type: Number, default: 0 },
  abr: { type: Number, default: 0 },
  may: { type: Number, default: 0 },
  jun: { type: Number, default: 0 },
  jul: { type: Number, default: 0 },
  ago: { type: Number, default: 0 },
  sep: { type: Number, default: 0 },
  oct: { type: Number, default: 0 },
  nov: { type: Number, default: 0 },
  dic: { type: Number, default: 0 },
  anual: { type: Number, default: null },
});

const MedicionCompletaSchema = new mongoose.Schema({
  id: { type: Number },
  mideAguas: { type: String },
  frecuencia: { type: String },
  comoMide: { type: String },
  telemetria: { type: String },
  sistemaOcupado: { type: String },
});

const StationSchema = new mongoose.Schema({
  check: { type: Boolean },
  idObra: { type: Number, required: true },
  tipoObra: { type: Number },
  codigoObra: { type: String, required: true },
  rutUsuario: { type: String },
  nombreUsuario: { type: String },
  tipo: { type: String },
  fechaRegistro: { type: Date },
  derecho: { type: String },
  medicion: { type: String },
  nombreInformante: { type: String },
  rutInformante: { type: String },
  region: { type: String },
  provincia: { type: String },
  comuna: { type: String },
  norte: { type: String },
  este: { type: String },
  huso: { type: String },
  naturaleza: { type: String },
  numNaturaleza: { type: Number },
  cuenca: { type: String },
  acuifero: { type: String, default: null },
  sectorSha: { type: String, default: null },
  nombreFuente: { type: String, default: null },
  tieneOtros: { type: Boolean },
  estadoObra: { type: EstadoSchema },
  motivoCambioEstado: { type: String, default: null },
  fechaCambioEstado: { type: Date, default: null },
  idInformante: { type: Number },
  motivoCambioInformante: { type: String, default: null },
  obraCaptacion: { type: Boolean },
  itemInformeMedicion: { type: ItemInformeMedicionSchema },
  estadoCompletitud: { type: String, default: null },
  derechoObra: { type: DerechoObraSchema },
  medicionCompleta: { type: MedicionCompletaSchema },
  fuenteSuperficial: { type: String },
  subCuenca: { type: String },
  subSubCuenca: { type: String },
  mideConCaudalimetro: { type: Boolean },
  habilitada: { type: Boolean },
  apr: { type: Boolean },
  puntoAlternativo: { type: Boolean },
  cuencaCorto: { type: String },
  estaCompleto: { type: Boolean, default: null },
});

module.exports = mongoose.model('Station', StationSchema);
