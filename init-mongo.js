db = db.getSiblingDB("captaHydro");

db.waterflowmeditions.createIndex(
  { fechaHoraMedicion: -1, 'obraCaptacion.codigo': 1 },
  { unique: true }
);

print("Unique index on 'fechaMedicion' created successfully.");
