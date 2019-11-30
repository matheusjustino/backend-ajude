//const usuario = require('../models/Usuario');
import usuario from "../models/Usuario";

class ApiUsuario {
    criarUsuario(usuarioReq: any) {
        console.log(usuarioReq);
        return usuario.create(usuarioReq);
    };

    usuarioEspecifico(id: any) {
        return  usuario.findById(id);
    };
}

const apiUsuario = new ApiUsuario();
export default apiUsuario;