import campanhaModel from "../models/Campanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";
import comentarioModel from "../models/Comentario";
import IComentarioModel from "../interfaces/IComentarioModel";
import UtilsCampanha from "../utils/UtilsCampanha";

class ApiCampanha {
    criarCampanha(campanhaReq: ICampanhaModel): Promise<ICampanhaModel> {
        const novaCampanha: Promise<ICampanhaModel> = campanhaModel.create(campanhaReq);
        return novaCampanha;
    };

    todasAsCampanhas(): Promise<ICampanhaModel[]> {
        const campanhas: any = campanhaModel.find();
        return campanhas;
    };

    campanhaByUrl(urlR: any): Promise<ICampanhaModel> {
        const campanha: any = campanhaModel.findOne({ url: urlR });
        return campanha;
    }

    atualizarCampanha(urlR: String, statusR: any, idUsuario: String): Promise<ICampanhaModel> {
        if (statusR.like || statusR.dislike) {
            return this.likeOuDislike(urlR, statusR, idUsuario);
        } else {
            const campanha: any = campanhaModel.updateOne({ url: urlR }, statusR);
            return campanha;
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