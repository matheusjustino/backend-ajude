import usuarioModel from "../../models/Usuario";
import campanhaModel from "../../models/Campanha";

import ICampanhaModel from "../../interfaces/ICampanhaModel";
import IComentarioModel from "../../interfaces/IComentarioModel";
import IRespostaModel from "../../interfaces/IRespostaModel";

const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[DonoGuard]");


// Se é o dono da campanha
export const DonoGuard = async (req: any, res: any) => {
    const usuario: any = await usuarioModel.findOne({ _id: req.userId });
    const campanha: ICampanhaModel | any = await campanhaModel.findOne({ url: req.params.url });
    if (campanha === null) {
        logger.error(`[DonoGuard] Msg: "Campanha não encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(400).json({ msg: "Campanha não encontrada" });
        return false;
    }
    
    if (campanha.dono === usuario.email) {
        return true;
    } else {
        logger.error(`[DonoGuard] Msg: "Sem permissão" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(401).json({ msg: "Sem permissão" });
        return false;
    }
}

// Se é o dono do comentário
export const DonoComentarioGuard = async (req: any, res: any) => {
    let campanha: ICampanhaModel | any = await campanhaModel.findOne({ url: req.params.url });
    if (campanha === null) {
        logger.error(`[DonoGuard] Msg: "Campanha não encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(400).json({ msg: "Campanha não encontrada" });
        return false;
    }

    const comentarioASerApagado: IComentarioModel = campanha.comentarios.filter((comentario: IComentarioModel) => comentario._id == req.body.idComentario)[0];
    
    if (comentarioASerApagado.dono == req.userId) {
        return true;
    } else {
        logger.error(`[DonoGuard] Msg: "Sem permissão" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(401).json({ msg: "Sem permissão" });
        return false;
    }
}

// Se é o dono da resposta
export const DonoRespostaGuard = async (req: any, res: any) => {
    let campanha: ICampanhaModel | any = await campanhaModel.findOne({ url: req.params.url });
    if (campanha === null) {
        logger.error(`[DonoGuard] Msg: "Campanha não encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(400).json({ msg: "Campanha não encontrada" });
        return false;
    }

    const comentarioDaRespostaASerApagada: IComentarioModel = campanha.comentarios.filter((comentario: IComentarioModel) => comentario._id == req.body.idComentario)[0];
    const respostaASerApagada: IRespostaModel | any = comentarioDaRespostaASerApagada.respostas.filter((resposta: any) => resposta._id == req.body.idResposta)[0];

    if (respostaASerApagada.dono == req.userId) {
        return true;
    } else {
        logger.error(`[DonoGuard] Msg: "Sem permissão" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
        res.status(401).json({ msg: "Sem permissão "});
        return false;
    }
}