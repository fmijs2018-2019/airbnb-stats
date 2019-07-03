import './config';
import bodyParser from 'body-parser';
import express from 'express';
import listingsRouter from './api/routes/listingsRouter';
import neighborhoodsRouter from './api/routes/neighborhoodsRouter';
import db, { syncDatabase } from './database/Db';
import helmet = require('helmet');
import cors = require('cors');

// syncDatabase(db);

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.use('/listings', listingsRouter);
app.use('/neighborhoods', neighborhoodsRouter);

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server running on http://localhost:${port}`);
