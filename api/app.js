require('./database/mongo');
const express = require('express');
const bodyParser = require('body-parser');
const stationRouter = require('./routes/station.router');
const scrapeRouter = require('./routes/scrape.router')

const app = express();
const PORT = 3000;

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', err });
});

app.use(bodyParser.json());

app.use('/stations', stationRouter);
app.use('/scrape', scrapeRouter)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
