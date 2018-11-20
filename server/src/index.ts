import './config';
import bodyParser from 'body-parser';
import express from 'express';

import { db } from './database';

db.Hosts.sync();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port);
