import mongoose from "./database/ConexaoBD";
//import router from "./routes"
import bodyParser from "body-parser";
const express = require("express");
const cors = require("cors");
const routes = require("./routes/RotasUsuarios");
const PORT = 3333

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", routes);


mongoose();

app.listen(PORT, () => {
    console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
});
//export default app;
//module.exports = app;