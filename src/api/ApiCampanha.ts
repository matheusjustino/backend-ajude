import campanhaModel from "../models/Campanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";

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
}

const apiCampanha = new ApiCampanha();
export default apiCampanha;