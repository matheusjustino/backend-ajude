const jwt = require('jsonwebtoken');
const Logger = require("../../logger/winston").Logger;
const logger = new Logger("[AuthGuard]");


export const AuthGuard = async (req: any, res: any) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        logger.error(`[AuthGuard] Msg: "Sem token de acesso" - Method: ${req.method} - URL: ${req.url}`);
        res.status(401).json({ auth: false, message: "Sem token de acesso" });
        return false;
    } else {
        const result = await jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
            if (err) {
                logger.error(`[AuthGuard] Msg: "Falha na autenticação. Token inválido." - Method: ${req.method} - URL: ${req.url}`);
                res.status(401).json({ auth: false, message: "Falha de autenticação" });
                return false;
            } else {
                req.userId = decoded._id;
                return true;
            }
        });
        return result;
    }
}

export default AuthGuard;