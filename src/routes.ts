import apiUsuario from "./api/ApiUsuario";
const express = require("express");

const router = express.Router();

const routes = [
    {
        method: "get",
        path: "/usuarios",
        action: apiUsuario.todosOsUsuarios
    },
    {
        method: "get",
        path: "/usuario",
        action: apiUsuario.usuarioEspecifico
    },
    {
        method: "post",
        path: "/usuarios",
        action: apiUsuario.criarUsuario
    }
];

const createRoute = (route: any) => router[route.method](route.path, route.action);

const createRoutes = (routes: any) => routes.map(createRoute);
createRoutes(routes);

//export default router;
module.exports = router;