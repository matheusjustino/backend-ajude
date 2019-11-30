//const usuario = require('../models/Usuario');
import usuarioModel from "../models/Usuario";

class ApiUsuario {
    criarUsuario(usuarioReq: any) {
        return usuarioModel.create(usuarioReq);
    };

    usuarioEspecifico(id: any) {
        return  usuarioModel.findById(id);
    };
}

const apiUsuario = new ApiUsuario();
export default apiUsuario;