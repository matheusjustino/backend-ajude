const app = require("./app.ts");
const PORT = 3333;

/*app.post("/usuarios", async (req:any, res:any) => {
    const user = await apiUsuario.criarUsuario(req.body);
    return res.json(user);
});*/

app.listen(PORT, () => {
    console.log(`[Servidor] Rodando em http://localhost:${PORT}`);
});