import apiUsuario from "../api/ApiUsuario";
import IUsuarioModel from "../interfaces/IUsuarioModel";
const authService = require("../services/Autenticacao");
const express = require("express");

const router = express.Router();


router.route("/usuarios")
    .get(authService, async (req: any, res: any): Promise<IUsuarioModel[]> => {
        const usuarios: IUsuarioModel[] = await apiUsuario.todosOsUsuarios();
        if (usuarios === null) {
            return res.status(404).json({ msg: "Nenhum usuário cadastrado" });
        } else {
            return res.json(usuarios);
        }
    })
    .post(async (req: any, res: any): Promise<IUsuarioModel> => {
        try {
        const novoUsuario: IUsuarioModel = await apiUsuario.criarUsuario(req.body);
        return res.json(novoUsuario);            
        } catch (error) {
            if (error.errmsg.includes("email")) {
                return res.status(400).json({ msg: "Email já cadastrado" });
            } else {
                return res.json(error.errmsg);
            }
        }
        //const novoUsuario: IUsuarioModel = await apiUsuario.criarUsuario(req.body);
        //return res.json(novoUsuario);
    });

router.route("/usuario")
    .get(authService, async (req: any, res: any): Promise<IUsuarioModel> => {
        const usuario: IUsuarioModel = await apiUsuario.usuarioPorEmail(req.body.email);
        if (usuario === null) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        } else {
            return res.json(usuario);
        }
    });


module.exports = router;