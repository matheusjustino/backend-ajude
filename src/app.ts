require("dotenv-safe").config();
import mongoose from "./database/ConexaoBD";
import bodyParser from "body-parser";
import { initRoutes } from "./Routes/router";
import routes from "./Routes/routes";

const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const router = initRoutes(routes);

const PORT = 3333

const app = express();


app.use(cors());
app.use(helmet()); // desabilitando alguns headears para maior segurança
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);


mongoose(); // conectando com o BD

app.listen(PORT, () => {
    console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
});
