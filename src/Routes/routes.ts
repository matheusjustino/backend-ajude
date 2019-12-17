import loginController from "./Controllers/LoginController";
import usuarioController from "./Controllers/UsuarioController";
import campanhaController from "./Controllers/CampanhaController";

import IRoute from "../interfaces/IRoute";

import { AuthGuard } from "./Guards/AuthGuard";
import { DonoGuard, DonoComentarioGuard, DonoRespostaGuard } from "./Guards/DonoGuard";

const routes: IRoute[]  = [
    // Rotas de autenticação
    {
        path: "auth",
        routes: [
            {
                path: "login",
                method: "POST",
                action: loginController.fazerLogin

            },
            {
                path: "logout",
                method: "GET",
                action: loginController.fazerLogout
            }
        ]
    },
    // Rotas de usuários
    {
        path: "usuarios",
        routes: [
            {
                path: "",
                method: "POST",
                action: usuarioController.criarUsuario
            },
            {
                path: "",
                method: "GET",
                guards: [AuthGuard],
                action: usuarioController.todosOsUsuarios
            }
        ]
    },
    {
        path: "usuario",
        method: "GET",
        guards: [AuthGuard],
        action: usuarioController.usuarioPorEmail
    },
    // Rotas de campanha
    {
        path: "campanhas",
        guards: [AuthGuard],
        routes: [
            {
                path: "",
                method: "POST",
                action: campanhaController.criarCampanha
            },
            {
                path: "",
                method: "GET",
                action: campanhaController.todasAsCampanhas
            },
            {
                path: "ativas",
                method: "GET",
                action: campanhaController.todasAsCampanhasAtivas
            },
            {
                path: "melhores-campanhas",
                method: "GET",
                action: campanhaController.melhoresCampanhas
            },
            {
                path: "substring",
                method: "GET",
                action: campanhaController.pesquisarCampanhaPorSubstring
            }
        ]
    },
    {
        path: "campanha",
        guards: [AuthGuard],
        routes: [
            {
                path: ":url",
                method: "GET",
                action: campanhaController.campanhaPorUrl
            },
            {
                path: ":url",
                method: "PUT",
                guards: [DonoGuard],
                action: campanhaController.atualizarCampanha
            },
            {
                path: ":url/comentar",
                method: "POST",
                action: campanhaController.fazerComentario
            },
            {
                path: ":url/apagar-comentario",
                method: "DELETE",
                guards: [DonoComentarioGuard],
                action: campanhaController.apagarComentario
            },
            {
                path: ":url/responder",
                method: "POST",
                action: campanhaController.responderComentario
            },
            {
                path: ":url/apagar-resposta",
                method: "DELETE",
                guards: [DonoRespostaGuard],
                action: campanhaController.apagarResposta
            },
            {
                path: ":url/:valor",
                method: "POST",
                action: campanhaController.darLikeOuDislike
            }
        ]
    },
    // Rota de perfil
    {
        path: "perfil",
        method: "GET",
        guards: [AuthGuard],
        action: usuarioController.meuPerfil
    }
]

export default routes;