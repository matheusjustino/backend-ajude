import mongoose from './database/ConexaoBD';
const express = require("express");
const cors = require("cors");
//const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
//app.use(routes);
mongoose();

export default app;