import usuarioModel from "../../models/Usuario";
import IUsuarioModel from "../../interfaces/IUsuarioModel";
const jwt = require('jsonwebtoken');

class LoginController {
    async fazerLogin(req: any, res: any) {
        try {
            const { email, senha, _id }: IUsuarioModel | any = await usuarioModel.findOne({ email: req.body.email });
            if (email === req.body.email && senha === req.body.senha) {
                const token = jwt.sign({ _id }, process.env.SECRET, {// passando id e secret para gerar o token
                    expiresIn: 900 // 15 minutos até ficar inválido
                });
                return res.status(200).json({ auth: true, token: token, usuario: { email: email } });
            }
            return res.status(500).json({ msg: "Login inválido!" });
        } catch (error) {
            return res.status(500).json(error.errmsg);
        }
    }

    fazerLogout(req: any, res: any) {
        return res.status(200).json({ auth: false, token: null });
    }
}

const loginController = new LoginController();
export default loginController;