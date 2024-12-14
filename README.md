# Automatización de extracción de caudales DGA

## Descripción
Proyecto Express con base de datos Mongo.

La base de datos está en un contenedor y cuenta con un script de inicialización para realizar las restricciones correspondientes a los campos de fecha y código de obras, en las mediciones de caudal con rango de fechas.

```sh
docker compose up -d
```

Una vez iniciada la base de datos, se configuran las variables de entorno e inicia la API en `localhost:3000`.

```sh
cd api
export MONGO_URI=mongodb://admin:password@localhost:27017/captaHydro?authSource=admin
npm run start
```

## Endpoints

### ```POST /scrape```

#### Caso 1: Scraping de las últimas 48 horas de todas las obras establecidas por defecto.

```
Request: 
POST http://localhost:3000/scrape

Response: 
{
    "stationsSuccess": 5,
    "stationsErrors": 0,
    "waterFlowMeditions": 92
}
```

#### Caso 2: scraping de todas las obras establecidas por defecto en un rango de fechas

```
Request: 
POST http://localhost:3000/scrape
{
    "fecha_inicio": "2024-12-12T01:07:59.000Z",
    "fecha_fin": "2024-12-13T01:07:59.000Z"
}

Response: 
{
    "stationsSuccess": 5,
    "stationsErrors": 0,
    "waterFlowMeditions": 122
}
```

#### Caso 3: scraping de obras específicas con rango de fechas
```
Request: 
POST http://localhost:3000/scrape
{
    "fecha_inicio": "2024-12-12T01:07:59.000Z",
    "fecha_fin": "2024-12-13T01:07:59.000Z",
    "codigos_obras": ["OB-1303-1255", "OB-1401-29"]
}

Response: 
{
    "stationsSuccess": 2,
    "stationsErrors": 0,
    "waterFlowMeditions": 50
}
```

#### Caso 4: scraping de obras específicas en las últimas 48 horas

```
Request: 
POST http://localhost:3000/scrape
{
    "codigos_obras": ["OB-1002-370"]
}

Response
{
    "stationsSuccess": 1,
    "stationsErrors": 0,
    "waterFlowMeditions": 19
}
```

### ```GET /stations```

#### Todas las obras con su último caudal

```
Request: 
GET http://localhost:3000/stations

Response:
[
    {
        "_id": "675d30949cbe67e018e25b90",
        "codigoObra": "OB-1303-1255",
        "itemInformeMedicion": {
            "caudal": 8309.51
        }
    },
    {
        "_id": "675d30949cbe67e018e25b91",
        "codigoObra": "OB-1401-29",
        "itemInformeMedicion": {
            "caudal": 35.19
        }
    },
    {
        "_id": "675d30d09cbe67e018e25b92",
        "codigoObra": "OB-1002-370",
        "itemInformeMedicion": {
            "caudal": 894
        }
    }
]
```

### ```GET /stations/:id```

#### Obra específica con su último caudal

```
Request: 
GET http://localhost:3000/stations/OB-1401-29

Response:
{
    "_id": "675d30949cbe67e018e25b91",
    "codigoObra": "OB-1401-29",
    "itemInformeMedicion": {
        "caudal": 35.19
    }
}
```
### ```GET /stations/:id/flow```


#### Obra específica con todos los caudales en un rango de fechas

```
Request: 
GET http://localhost:3000/stations/OB-1401-29/flow?fecha_inicio=2024-12-10T01:07:59.000Z&fecha_fin=2024-12-12T01:07:59.000Z

Response:
[
    {
        "_id": "675d30960c88f16b8110bc33",
        "fechaHoraMedicion": 1733965679000,
        "caudal": 40.38
    }
]
```