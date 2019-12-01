import usuarioModel from "../models/Usuario";
import IUsuarioModel from "../interfaces/IUsuarioModel";

class ApiUsuario {
    criarUsuario(usuarioReq: IUsuarioModel): Promise<IUsuarioModel> {
        const novoUsuario: Promise<IUsuarioModel> = usuarioModel.create(usuarioReq);
        return novoUsuario;
    };

    usuarioEspecifico(id: String): IUsuarioModel {
        const usuario: any = usuarioModel.findById(id);
        return  usuario;
    };

    usuarioPorEmail(email: String): IUsuarioModel {
        const usuario: any = usuarioModel.findOne({ email });
        return usuario;
    }

    todosOsUsuarios(): Promise<IUsuarioModel[]> {
        const usuarios: any = usuarioModel.find();
        return usuarios;
    }
}

const apiUsuario = new ApiUsuario();
export default apiUsuario;