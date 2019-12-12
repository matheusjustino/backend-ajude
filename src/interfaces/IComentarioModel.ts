import { Document } from "mongoose";

interface IComentarioModel extends Document {
    texto: string,
    dono: string,
    respostas: []
}

export default IComentarioModel;