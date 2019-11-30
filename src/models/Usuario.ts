import { Schema, model } from 'mongoose';
// Definindo o modelo de um usuário
const UsuarioSchema = new Schema({
    primeiroNome: {
        type: String,
        require: true
    },
    ultimoNome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique : true, // Email deve ser único
        dropDups: true // Mongodb irá previamente excluir duplicados, se existirem 
    },
    cartao: {
        type: String,
        require: true
    },
    senhaCartao: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

const user = model("Usuario", UsuarioSchema);
export default user;