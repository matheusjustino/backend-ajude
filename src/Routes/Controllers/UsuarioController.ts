import usuarioModel from "../../models/Usuario";
import campanhaModel from "../../models/Campanha";

import IUsuarioModel from "../../interfaces/IUsuarioModel";
import ICampanhaModel from "../../interfaces/ICampanhaModel";

import UtilsUsuario from "../../utils/UtilsUsuario";

import { Response, Request } from "express";

const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[UsuarioController]");

class UsuarioController {
    async criarUsuario(req: Request, res: Response): Promise<Response> {
        const novoUsuarioModel: IUsuarioModel = new usuarioModel(req.body);
        try {
            const novoUsuario: IUsuarioModel = await usuarioModel.create(novoUsuarioModel);
            if (novoUsuario === null) {
                logger.error(`[Erro ao criar usuário] Method: ${req.method} - URL: ${req.url}`);
                return res.status(400).json({ msg: "Erro ao tentar criar um usuário" });
            }
            logger.info(`[Criação bem-sucedida] Usuaŕio ${novoUsuario.primeiroNome} ${novoUsuario.ultimoNome} - ID: ${novoUsuario._id} - Method: ${req.method} - URL: ${req.url}`);
            return res.json(novoUsuario);
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async todosOsUsuarios(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuarios: IUsuarioModel[] = await usuarioModel.find();
            if (usuarios === null) {
                logger.error(`[Erro ao busucar usuários] Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Erro ao tentar buscar os usuários" });
            }
            logger.info(`[Busca bem-sucedida] Busca feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
            return res.json(usuarios);
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async usuarioPorId(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findById(req.userId);
            if (usuario === null) {
                logger.error(`[Erro ao busucar usuário] Msg: "Usuário não encontrado" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Usuário não encontrado" });
            } else {
                logger.info(`[Busca bem-sucedida] Busca feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(usuario);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async usuarioPorEmail(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findOne({ email: req.body.email });
            if (usuario === null) {
                logger.error(`[Erro ao busucar usuário] Msg: "Usuário não encontrado" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Usuário não encontrado" });
            } else {
                logger.info(`[Busca bem-sucedida] Busca feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json(usuario);
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }

    async meuPerfil(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findOne({ _id: req.userId });
            if (usuario === null) {
                logger.error(`[Erro ao busucar usuário] Msg: "Usuário não encontrado" - Method: ${req.method} - URL: ${req.url} - Usuário: ${req.userId}`);
                return res.status(400).json({ msg: "Usuário não encontrado" });
            } else {
                const campanhasCriadas: ICampanhaModel[] = await campanhaModel.find({ dono: usuario.email });
                
                const normalizaCampanhas = campanhasCriadas.map((campanha: ICampanhaModel) => {
                    return { status: campanha.status, nomeCurto: campanha.nomeCurto, url: campanha.url };
                });

                logger.info(`[Busca bem-sucedida] Busca feita por ${req.userId} - Method: ${req.method} - URL: ${req.url}`);
                return res.json({ usuario: usuario, campanhasCriadas: normalizaCampanhas });
            }
        } catch (error) {
            logger.error(error);
            return res.status(400).json(error);
        }
    }
}

const usuarioController = new UsuarioController();
export default usuarioController;