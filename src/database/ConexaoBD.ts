const { connect } = require('mongoose');
const { databaseConfig } = require("../configs/Config.json");

connect(databaseConfig.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log("Banco de dados ON!"));

export default () => connect;