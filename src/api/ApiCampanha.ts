import campanhaModel from "../models/Campanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";
import IComentarioModel from "../interfaces/IComentarioModel";
import UtilsCampanha from "../utils/UtilsCampanha";
import usuarioModel from "../api/ApiUsuario";

class ApiCampanha {
    criarCampanha(campanhaReq: ICampanhaModel): Promise<ICampanhaModel> {
        campanhaReq = UtilsCampanha.alteraStatus(campanhaReq);
        const novaCampanha: Promise<ICampanhaModel> = campanhaModel.create(campanhaReq);
        return novaCampanha;
    };

    todasAsCampanhas(): Promise<ICampanhaModel[]> {
        const campanhas: any = campanhaModel.find();
        return campanhas;
    };

    todasAsCampanhasAtivas(): Promise<ICampanhaModel[]> {
        const campanhas: any = campanhaModel.find();
        return campanhas.filter((campanha: ICampanhaModel) => campanha.status === "Ativa");
    };

    async melhoresCampanhas(): Promise<ICampanhaModel[]> {
        let campanhas: any = await this.todasAsCampanhas();
        return campanhas.filter((campanha: ICampanhaModel) => campanha.status === "Ativa").sort(UtilsCampanha.ordenaPorMeta).slice(0, 4);
    }

    campanhaByUrl(urlR: any): Promise<ICampanhaModel> {
        const campanha: any = campanhaModel.findOne({ url: urlR });
        return campanha;
    }

    async fazerDoacao(urlR: String, doacao: number): Promise<ICampanhaModel> {
        let campanha: any = await campanhaModel.findOne({ url: urlR });
        campanha.doacoes = (parseFloat(campanha.doacoes) + doacao) + "";
        UtilsCampanha.alteraStatus(campanha);
        await campanhaModel.updateOne({ url: urlR }, campanha);
        return campanha;
    }

    async atualizarCampanha(urlR: String, statusR: any, idUsuario: String, res: any): Promise<ICampanhaModel> {
        const { email } = await usuarioModel.usuarioEspecifico(idUsuario);
        let campanha: any = await campanhaModel.findOne({ url: urlR });
        if (statusR.like || statusR.dislike) {
            return this.likeOuDislike(urlR, statusR, idUsuario);
        }
        if (email === campanha.dono) {
            const chave: String | Number | any = Object.keys(statusR)[0];
            const valor: String | Number | any = Object.values(statusR)[0];
            campanha[chave] = valor;
            UtilsCampanha.alteraStatus(campanha);
            await campanhaModel.updateOne({ url: urlR }, campanha);
            return campanha;
        } else {
            return res.status(401).json("Sem permissão");
        }
    }

    async likeOuDislike(urlR: String, statusR: any, idUsuario: String): Promise<ICampanhaModel> {
        let campanha: any = await campanhaModel.findOne({ url: urlR });
        const { like, dislike, arrayLikesEDislikes } = UtilsCampanha.likeOuDislike(idUsuario, statusR.like ? 1 : 2, campanha.likesEDislikes);
        campanha.like = like;
        campanha.dislike = dislike;
        campanha.likesEDislikes = arrayLikesEDislikes;
        await campanhaModel.updateOne({ url: urlR }, campanha);
        return campanha;
    }

    async fazerComentario(urlR: String, comentario: IComentarioModel): Promise<ICampanhaModel> {
        let campanha: any = await campanhaModel.findOne({ url: urlR });
        campanha.comentarios.push(comentario);
        await campanhaModel.updateOne({ url: urlR }, campanha);
        return campanha;
    }

    async responderComentario(urlR: String, resposta: any, idComentario: String): Promise<ICampanhaModel> {
        let campanha: any = await campanhaModel.findOne({ url: urlR });
        campanha.comentarios.filter((comentario: any) => comentario._id == idComentario)[0].respostas.push(resposta);
        await campanhaModel.updateOne({ url: urlR }, campanha);
        return campanha;
    }
}

const apiCampanha = new ApiCampanha();
export default apiCampanha;