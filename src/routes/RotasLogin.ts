import apiUsuario from "../api/ApiUsuario";
import IUsuarioModel from "../interfaces/IUsuarioModel";
const express = require("express");
const jwt = require('jsonwebtoken');

const router = express.Router();

const verificaJWT = (req: any, res: any, next: any) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ auth: false, message: "Sem token de acesso" });
    
    jwt.verify(token, process.env.SECRET, function(err: any, decoded: any) {
        if (err) return res.status(500).json({ auth: false,  message: "Falha na autenticação" });

        req.userId = decoded.id;
        next();
    });
}

router.route("/login")
    .post(async (req: any, res: any) => {
        const { email, senha, _id }: IUsuarioModel = await apiUsuario.usuarioPorEmail(req.body.email);
        if (email === req.body.email && senha === req.body.senha) {
            const token = jwt.sign({ _id }, process.env.SECRET, {// passando id e secret para gerar o token
                expiresIn: 900 // 15 minutos até ficar inválido
            });
            return res.status(200).json({ auth: true, token: token, usuario: { email: email } });
        }
        return res.status(500).json("Login inválido!");
    });

router.route("/logout")
    .get(async (req: any, res: any) => {
        res.status(200).json({ auth: false, token: null });
    })

module.exports = router;