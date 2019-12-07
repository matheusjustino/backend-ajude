require("dotenv-safe").config();
import mongoose from "./database/ConexaoBD";
import bodyParser from "body-parser";
const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
//const rotasUsuario = require("./routes/RotasUsuarios");
//const rotasLogin = require("./routes/RotasLogin");
//const rotasCampanha = require("./routes/RotasCampanha");

import { initRoutes } from "./Routes/router";
import routes from "./Routes/routes";

const PORT = 3333

const app = express();


app.use(cors());
app.use(helmet()); // desabilitando alguns headears para maior segurança
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
//app.use("/api", [rotasLogin, rotasUsuario, rotasCampanha]);
const router = initRoutes(routes);
//console.log(router);
app.use("/api", router);


mongoose(); // conectando com o BD

app.listen(PORT, () => {
    console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
});
