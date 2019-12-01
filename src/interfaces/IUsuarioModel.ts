import { Document } from "mongoose";
import IUsuario from "./IUsuario";

interface IUsuarioModel extends IUsuario, Document { }

export default IUsuarioModel;