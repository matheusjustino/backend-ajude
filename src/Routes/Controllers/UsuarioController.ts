import usuarioModel from "../../models/Usuario";
import campanhaModel from "../../models/Campanha";

import IUsuarioModel from "../../interfaces/IUsuarioModel";
import ICampanhaModel from "../../interfaces/ICampanhaModel";

import UtilsUsuario from "../../utils/UtilsUsuario";

class UsuarioController {
    async criarUsuario(req: any, res: any): Promise<IUsuarioModel> {
        const novoUsuarioModel: IUsuarioModel = new usuarioModel(req.body);
        try {
            const novoUsuario: IUsuarioModel | null = await usuarioModel.create(novoUsuarioModel);
            return res.json(novoUsuario);
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async todosOsUsuarios(req: any, res: any): Promise<IUsuarioModel[]> {
        try {
            const usuarios: IUsuarioModel[] = await usuarioModel.find();
            return res.json(usuarios);
        } catch (error) {
            return res.status(400).json(error.errmsg);
        }
    }

    async usuarioPorId(req: any, res: any): Promise<IUsuarioModel> {
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

    async usuarioPorEmail(req: any, res: any): Promise<IUsuarioModel> {
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

    async meuPerfil(req: any, res: any) {
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