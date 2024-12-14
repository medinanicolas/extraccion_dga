const axios = require('axios');
const WaterFlowMedition = require('../models/waterFlowMedition.model');
const { processStationsIds } = require('../utils/scrape.utils')

exports.scrapeStations = async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin, codigos_obras } = req.body;

        const getAccessTokenRequestPayload = { "apiCode": "MEESECINT", "apiKey": "73A58577C1CCB258DFD79116EAD8F", "app": "exponline" }
        const getAccessTokenResponse = await axios.post('https://snia.mop.gob.cl/mee-auth-rest/v1/authorization', getAccessTokenRequestPayload, { headers: { 'Content-Type': 'application/json' } })
        const accessToken = getAccessTokenResponse.data.accessToken;

        const stationsAndWaterFlowHeaders = {
            headers: {
                "Sec-Ch-Ua-Platform": "Linux",
                "Authorization": `Bearer ${accessToken}`,
                "Accept-Language": "en-US,en;q=0.9",
                "Sec-Ch-Ua": "Chromium;v=\"131\", \"Not_A Brand\";v=\"24\"",
                "Sec-Ch-Ua-Mobile": "?0",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Origin": "https://snia.mop.gob.cl",
                "Referer": "https://snia.mop.gob.cl/cExtracciones2/",
                "Accept-Encoding": "gzip, deflate, br",
                "Priority": "u=1, i"
            }
        }

        // This could be a configurable param
        const stationsIds = codigos_obras || [
            "OB-1401-29",
            "OB-1305-1106",
            "OB-1002-370",
            "OB-1303-1255",
            "OB-1303-1072"
        ];

        try {
            const updatedStations = await Promise.allSettled(
                stationsIds.map((stationId) => processStationsIds(stationId, stationsAndWaterFlowHeaders))
            );


            const fullfilledPromisesInUpdatedStations = updatedStations
                .filter(result => result.status === "fulfilled")
                .map(result => result.value);

            const rejectedPromisesInUpdatedStations = updatedStations
                .filter(result => result.status === "rejected")
                .map(result => result.reason);

            const fortyEightHoursAgo = new Date();
            fortyEightHoursAgo.setDate(fortyEightHoursAgo.getDate() - (48 / 24));

            const today = new Date();

            const waterFlowStartDate = fecha_inicio || fortyEightHoursAgo.toISOString(); // Full ISO format
            const waterFlowEndDate = fecha_fin || today.toISOString();


            const getWaterFlowByStationPayload = { "data": { "fechaDesde": waterFlowStartDate, "fechaHasta": waterFlowEndDate, "obras": fullfilledPromisesInUpdatedStations, "codigoObra": null } }
            const getWaterFlowByStationResponse = await axios.post('https://snia.mop.gob.cl/extracciones/data/medicion/extracciones', getWaterFlowByStationPayload, stationsAndWaterFlowHeaders)

            let waterFlowMeditionsCounter = 0;

            for (let subArray of getWaterFlowByStationResponse.data.data) {
                try {
                    const validWaterFlow = subArray.filter(item => item.fechaHoraMedicion !== null && item.caudal !== null && item.obraCaptacion !== null);

                    if (validWaterFlow.length > 0) {
                        await WaterFlowMedition.insertMany(validWaterFlow, { ordered: true });
                        console.log('Inserted successfully:', validWaterFlow.length);
                        waterFlowMeditionsCounter += validWaterFlow.length;
                    } else {
                        console.error('No valid data to insert in this sub-array');
                    }
                } catch (error) {
                    console.error('Error inserting data:', error.message);
                }
            }

            res.status(201).json({
                stationsSuccess: fullfilledPromisesInUpdatedStations.length,
                stationsErrors: rejectedPromisesInUpdatedStations.length,
                waterFlowMeditions: waterFlowMeditionsCounter
            })


        } catch (err) {
            console.error('Error processing codigoObras:', err);
            res.status(500).json({ error: 'Internal Server Error', err })
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', err })
    }
}