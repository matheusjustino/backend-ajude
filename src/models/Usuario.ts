import { Schema, model } from "mongoose";
import IUsuarioModel from "../interfaces/IUsuarioModel";

const bcrypt = require("bcryptjs");

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
        lowercase: true,
        unique : true, // Email deve ser único
        dropDups: true // Mongodb irá previamente excluir duplicados, se existirem 
    },
    cartao: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

UsuarioSchema.pre("save", async function(next: any) {
    const usuario: IUsuarioModel | any = this;
    const hash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = hash;
    
    next();
});

const user = model<IUsuarioModel>("Usuario", UsuarioSchema);
export default user;