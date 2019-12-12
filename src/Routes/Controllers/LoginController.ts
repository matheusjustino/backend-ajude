import usuarioModel from "../../models/Usuario";
import IUsuarioModel from "../../interfaces/IUsuarioModel";

import { Response, Request } from "express";

const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[LoginController]");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class LoginController {
    async fazerLogin(req: Request, res: Response): Promise<Response> {
        try {
            logger.info(`[Tentativa de login] Verbo HTTP: ${req.method} - URL: ${req.url}`);
            const { email, senha, _id }: IUsuarioModel | any = await usuarioModel.findOne({ email: req.body.email });
            if (email === req.body.email && await bcrypt.compare(req.body.senha, senha)) {
                const token = jwt.sign({ _id }, process.env.SECRET, {// passando id e secret para gerar o token
                    expiresIn: 900 // 15 minutos até ficar inválido
                });
                logger.info(`[Login bem-sucedido] Id usuário: ${_id}`);
                return res.status(200).json({ auth: true, token: token, usuario: { email: email } });
            }
            logger.error(`[Login malsucedido] Id usuário: ${_id}`)
            return res.status(500).json({ msg: "Login inválido!" });
        } catch (error) {
            logger.error(error);
            return res.status(500).json(error.errmsg);
        }
    }

    fazerLogout(req: Request, res: Response): Response {
        return res.status(200).json({ auth: false, token: null });
    }
}

const loginController = new LoginController();
export default loginController;