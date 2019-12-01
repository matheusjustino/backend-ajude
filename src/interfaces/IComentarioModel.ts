import { Document } from "mongoose";

interface IComentarioModel extends Document{
    texto: String,
    dono: String,
    comentarios: [{}]
}

export default IComentarioModel;