const jwt = require('jsonwebtoken');

export const AuthGuard = async (req: any, res: any) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json({ auth: false, message: "Sem token de acesso" });
        return false;
    } else {
        const result = await jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
            if (err) {
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