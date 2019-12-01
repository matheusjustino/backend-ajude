import apiUsuario from "../api/ApiUsuario";
import IUsuarioModel from "../interfaces/IUsuarioModel";
const express = require("express");

const router = express.Router();


router.route("/usuarios")
    .get(async (req: any, res: any): Promise<IUsuarioModel[]> => {
        const usuarios: IUsuarioModel[] = await apiUsuario.todosOsUsuarios();
        return res.json(usuarios);
    })
    .post(async (req: any, res: any): Promise<IUsuarioModel> => {
        const novoUsuario: IUsuarioModel = await apiUsuario.criarUsuario(req.body);
        return res.json(novoUsuario);
    });

router.route("/usuario")
    .get(async (req: any, res: any): Promise<IUsuarioModel> => {
        const usuario: IUsuarioModel = await apiUsuario.usuarioPorEmail(req.body.email);
        return res.json(usuario);
    });


module.exports = router;