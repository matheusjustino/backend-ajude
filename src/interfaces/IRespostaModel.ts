import { Document } from "mongoose";

interface IReposta extends Document {
    texto: string,
    dono: string
}

export default IReposta;
