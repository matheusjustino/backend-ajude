const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://projeto-ajude:ajude321123@cluster0-r58uk.mongodb.net/dbAjude?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, console.log("Banco de dados ON!"));

export default () => mongoose;