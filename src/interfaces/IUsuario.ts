import { Document } from 'mongoose';

interface IUsuario extends Document {
    primeiroNome: String,
    ultimoNome: String,
    email: String,
    cartao: String,
    senhaCartao: String,
}

export default IUsuario;