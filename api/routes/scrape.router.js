const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { scrapeStations } = require('../controllers/scrape.controller');

router.post('/', authMiddleware.authenticate, scrapeStations);

module.exports = router;