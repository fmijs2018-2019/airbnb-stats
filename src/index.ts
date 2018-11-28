import './config';
import bodyParser from 'body-parser';
import express from 'express';

import { db } from './database';

db.Hosts.sync();
db.Listings.sync();
db.Neighborhoods.sync();
db.Calendars.sync();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`listening on port ${port}`);
