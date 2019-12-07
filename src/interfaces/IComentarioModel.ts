import { Document } from "mongoose";

interface IComentarioModel extends Document {
    texto: String,
    dono: String,
    respostas: [{}]
}

export default IComentarioModel;