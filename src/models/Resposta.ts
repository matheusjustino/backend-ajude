import { Schema, model } from "mongoose";
import IRespostaModel from "../interfaces/IRespostaModel";

const RespostaSchema = new Schema({
    texto: {
        type: String,
        required: true,
        default: ""
    },
    dono: {
        type: String,
        required: true,
        default: ""
    }
});

const resposta = model<IRespostaModel>("Resposta", RespostaSchema);
export default resposta;