import './config';
import bodyParser from 'body-parser';
import express from 'express';
import listingsRouter from './api/routes/listingsRouter';
import neighborhoodsRouter from './api/routes/neighborhoodsRouter';
import db, { syncDatabase } from './database/Db';
import jwt from 'express-jwt';
import helmet = require('helmet');
import cors = require('cors');
const jwksRsa = require('jwks-rsa');

syncDatabase(db);

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://airbnb-stats.eu.auth0.com/.well-known/jwks.json`
    }),

    audience: 'jz1zd7BI5Lx5UjcU3Ua62XkVPqvZOuND',
    issuer: `https://airbnb-stats.eu.auth0.com/`,
    algorithms: ['RS256']
});

app.use('/listings', checkJwt, listingsRouter);
app.use('/neighborhoods', checkJwt, neighborhoodsRouter);

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server running on http://localhost:${port}`);
