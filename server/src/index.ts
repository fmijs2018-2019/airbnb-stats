import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config({ path: "../.env"});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;
app.listen(port);
