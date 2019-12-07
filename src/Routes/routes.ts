import loginController from "./Controllers/LoginController";
import usuarioController from "./Controllers/UsuarioController";
import campanhaController from "./Controllers/CampanhaController";
//import Autenticacao from "../services/Autenticacao";
import { AuthGuard } from "./Guards/AuthGuard";
import { DonoGuard, DonoComentarioGuard, DonoRespostaGuard } from "./Guards/DonoGuard";

const routes = [
    {
        path: "",
        method: "GET",
        action: usuarioController.todosOsUsuarios
    },
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
    {
        path: "perfil",
        method: "GET",
        guards: [AuthGuard],
        action: usuarioController.meuPerfil
    }
]

export default routes;