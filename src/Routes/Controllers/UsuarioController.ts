import usuarioModel from "../../models/Usuario";
import campanhaModel from "../../models/Campanha";

import IUsuarioModel from "../../interfaces/IUsuarioModel";
import ICampanhaModel from "../../interfaces/ICampanhaModel";

import UtilsUsuario from "../../utils/UtilsUsuario";

import { Response, Request } from "express";

class UsuarioController {
    async criarUsuario(req: Request, res: Response): Promise<Response> {
        const novoUsuarioModel: IUsuarioModel = new usuarioModel(req.body);
        try {
            const novoUsuario: IUsuarioModel = await usuarioModel.create(novoUsuarioModel);
            return res.json(novoUsuario);
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async todosOsUsuarios(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios: IUsuarioModel[] = await usuarioModel.find();
            return res.json(usuarios);
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async usuarioPorId(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findById(req.userId);
            if (usuario === null) {
                return res.status(400).json({ msg: "Usuário não encontrado" });
            } else {
                return res.json(usuario);
            }
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async usuarioPorEmail(req: Request, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findOne({ email: req.body.email });
            if (usuario === null) {
                return res.status(400).json({ msg: "Usuário não encontrado" });
            } else {
                return res.json(usuario);
            }
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async meuPerfil(req: Request | any, res: Response): Promise<Response> {
        try {
            const usuario: IUsuarioModel | null = await usuarioModel.findOne({ _id: req.userId });
            if (usuario === null) {
                return res.status(400).json({ msg: "Usuário não encontrada" });
            } else {
                const campanhasCriadas: ICampanhaModel[] = await campanhaModel.find({ dono: usuario.email });
                
                const normalizaCampanhas = campanhasCriadas.map((campanha: ICampanhaModel) => {
                    return { status: campanha.status, nomeCurto: campanha.nomeCurto, url: campanha.url };
                });
                
                return res.json({ usuario: usuario, campanhasCriadas: normalizaCampanhas });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

const usuarioController = new UsuarioController();
export default usuarioController;