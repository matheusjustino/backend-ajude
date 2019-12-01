import { Schema, model } from "mongoose";
import ICampanhaModel from "../interfaces/ICampanhaModel";

// Definindo o modelo de uma campanha
const CampanhaSchema = new Schema({
    nomeCurto: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    descricao: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Ativa"
    },
    meta: {
        type: String,
        required: true,
        default: "0"
    },
    doacoes: {
        type: String,
        required: true,
        default: "0"
    },
    dono: {
        type: String,
        required: true
    },
    comentarios: [],
    like: {
        type: Number,
        required: true,
        default: 0
    },
    dislike: {
        type: Number,
        required: true,
        default: 0
    },
    deuLike: [{
        type: String,
        default: []
    }],
    deuDislike: [{
        type: String,
        default: []
    }]
});

const campanha = model<ICampanhaModel>("Campanha", CampanhaSchema);
export default campanha;