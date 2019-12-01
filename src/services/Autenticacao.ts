const jwt = require('jsonwebtoken');

const verificaJWT = async (req: any, res: any, next: any) => {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).json({ auth: false, message: "Sem token de acesso" });
    await jwt.verify(token, process.env.SECRET, function(err: any, decoded: any) {
        if (err) return res.status(500).json({ auth: false,  message: "Falha de autenticação" });
        req.userId = decoded._id;
        next();
    });
}

module.exports = verificaJWT;