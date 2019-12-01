import { Schema, model } from "mongoose";
import IComentarioModel from "../interfaces/IComentarioModel";

const ComentarioSchema = new Schema({
    texto: {
        type: String,
        required: true,
        default: ""
    },
    dono: {
        type: String,
        required: true,
        default: ""
    },
    respostas: [{
        texto: {
            type: String,
            default: ""
        },
        dono: {
            type: String,
            default: ""
        }
    }]
});


const comentario = model<IComentarioModel>("Comentario", ComentarioSchema);
export default comentario;