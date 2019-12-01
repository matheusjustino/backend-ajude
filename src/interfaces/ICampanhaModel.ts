import { Document } from "mongoose";
import ICampanha from "./ICampanha";

interface ICampanhaModel extends ICampanha, Document { }

export default ICampanhaModel;