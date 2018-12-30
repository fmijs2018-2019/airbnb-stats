import './config';
import bodyParser from 'body-parser';
import express from 'express';
import listingsRouter from './api/routes/listingsRouter';
import neighborhoodsRouter from './api/routes/neighborhoodsRouter';
import db, { syncDatabase } from './database/Db';

syncDatabase(db);

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){ 
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next(); 
  });

app.use('/listings', listingsRouter);
app.use('/neighborhoods', neighborhoodsRouter);

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server running on http://localhost:${port}`);
