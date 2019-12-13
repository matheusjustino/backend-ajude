import usuarioModel from "../../models/Usuario";
import campanhaModel from "../../models/Campanha";
import comentarioModel from "../../models/Comentario";
import respostaModel from "../../models/Resposta";

import ICampanhaModel from "../../interfaces/ICampanhaModel";
import IComentarioModel from "../../interfaces/IComentarioModel";
import IRespostaModel from "../../interfaces/IRespostaModel";

import UtilsCampanha from "../../utils/UtilsCampanha";

import { Response, Request } from "express";

const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[CampanhaController]");


const likeOuDislike: { [key: string]: number } = {
    like: 1,
    dislike: 2
}


class CampanhaController {
    async criarCampanha(req: Request | any, res: Response): Promise<Response> {
        const novaCampanhaModel: ICampanhaModel = UtilsCampanha.alteraStatus(new campanhaModel(req.body));
        novaCampanhaModel.url = UtilsCampanha.geraUrl(novaCampanhaModel.url);
        try {
            const novaCampanha = await campanhaModel.create(novaCampanhaModel);
            if (novaCampanha === null) {
                logger.error(`[Erro ao criar campanha] Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.json({ msg: "Erro ao tentar criar a campanha" });
            } else {
                logger.info(`[Criação bem-sucedida] Campanha ${novaCampanha.nomeCurto} criada por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(novaCampanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async pesquisarCampanhaPorSubstring(req: Request | any, res: Response): Promise<Response> {
        try {
            const substring: string = req.body.nomeCurto;
            const campanhas: ICampanhaModel[] = await campanhaModel.find({ nomeCurto: { $regex: `${ substring.toLowerCase()}` } });
            if (campanhas === null) {
                logger.error(`[Erro ao buscar campanha(s)] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Nenhuma campanha encontrada" });
            } else {
                logger.info(`[Busca bem-sucedida] Busca feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanhas);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async todasAsCampanhas(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanhas: ICampanhaModel[] = await campanhaModel.find();
            if (campanhas === null) {
                logger.error(`[Erro ao buscar campanhas] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Nenhuma campanha encontrada" });
            } else {
                logger.info(`[Busca bem-sucedida] Requição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanhas);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async todasAsCampanhasAtivas(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanhas: ICampanhaModel[] = await campanhaModel.find({ status: "Ativa" });
            if (campanhas === null) {
                logger.error(`[Erro ao buscar campanhas ativas] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Nenhuma campanha ativa encontrada" });
            } else {
                logger.info(`[Busca bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanhas);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async melhoresCampanhas(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanhas: ICampanhaModel[] = await campanhaModel.find({ status: "Ativa" });
            const top5Campanhas = campanhas.sort(UtilsCampanha.ordenaPorMeta).slice(0, 4);
            if (top5Campanhas === null) {
                logger.error(`[Erro ao buscar melhores campanhas] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Nenhuma campanha encontrada" });
            } else {
                logger.info(`[Busca bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(top5Campanhas);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error.errmsg);
        }
    }

    async campanhaPorUrl(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                logger.info(`[Busca bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async atualizarCampanha(req: Request | any, res: Response): Promise<Response> {
        try {
            let campanha: ICampanhaModel | any = await campanhaModel.findOne({ url: req.params.url });
            
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Nenhuma campanha encontrada" });
            }

            const chave: string = Object.keys(req.body)[0];
            
            const valor: any = Object.values(req.body)[0];
            
            campanha[chave] = valor;
            
            UtilsCampanha.alteraStatus(campanha);
            
            await campanhaModel.updateOne({ url: campanha.url }, campanha);
            logger.info(`[Atualização bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
            return res.json(campanha);
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async darLikeOuDislike(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                const valor: string = req.params.valor;
                
                const { like, dislike, arrayLikesEDislikes } = UtilsCampanha.likeOuDislike(req.userId, likeOuDislike[valor], campanha.likesEDislikes);
                
                campanha.like = like;
                
                campanha.dislike = dislike;
                
                campanha.likesEDislikes = arrayLikesEDislikes;
                
                await campanhaModel.updateOne({ url: req.params.url }, campanha);
                logger.info(`[Atualização de LikeOuDislike bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async fazerComentario(req: Request | any, res: Response): Promise<Response> {
        try {
            let campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                const comentario: IComentarioModel = new comentarioModel(req.body);
                
                comentario.dono = req.userId;
                
                campanha.comentarios.push(comentario);
                
                await campanhaModel.updateOne({ url: req.params.url }, campanha);
                logger.info(`[Comentário bem-sucedido] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(40).json(error);
        }
    }

    async apagarComentario(req: Request | any, res: Response): Promise<Response> {
        try {
            let campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                campanha.comentarios = campanha.comentarios.filter((comentario: IComentarioModel) => comentario.dono != req.userId);
                
                await campanhaModel.updateOne({ url: req.params.url }, campanha);
                logger.info(`[Comentário Apagado] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async responderComentario(req: Request | any, res: Response): Promise<Response> {
        try {
            let campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                const resposta: IRespostaModel = new respostaModel(req.body.resposta);
                
                resposta.dono = req.userId;
                
                campanha.comentarios.filter((comentario: IComentarioModel) => comentario._id == req.body.idComentario)[0].respostas.push(resposta);
                
                await campanhaModel.updateOne({ url: req.params.url }, campanha);
                logger.info(`[Resposta bem-sucedida] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async apagarResposta(req: Request | any, res: Response): Promise<Response> {
        try {
            const campanha: ICampanhaModel | null = await campanhaModel.findOne({ url: req.params.url });
            if (campanha === null) {
                logger.error(`[Erro ao buscar campanha] Msg: "Nenhuma campanha encontrada" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Campanha não encontrada" });
            } else {
                const comentarioDaRespostaASerApagada: any = campanha.comentarios.filter((comentario: IComentarioModel) => comentario._id == req.body.idComentario)[0];
                
                comentarioDaRespostaASerApagada.respostas = comentarioDaRespostaASerApagada.respostas.filter((resposta: IRespostaModel) => resposta._id != req.body.idResposta);
                
                campanha.comentarios = comentarioDaRespostaASerApagada;
                
                await campanhaModel.updateOne({ url: req.params.url }, campanha);
                logger.info(`[Resposta apagada] Requisição feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(campanha);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }
}

const campanhaController = new CampanhaController();
export default campanhaController;