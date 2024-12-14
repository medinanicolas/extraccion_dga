const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { getAllStations, getStationById, getWaterFlowByDateAndStationId } = require('../controllers/station.controller');

router.get('/', authMiddleware.authenticate, getAllStations);
router.get('/:stationId', authMiddleware.authenticate, getStationById);
router.get('/:stationId/flow', authMiddleware.authenticate, getWaterFlowByDateAndStationId);


module.exports = router;
