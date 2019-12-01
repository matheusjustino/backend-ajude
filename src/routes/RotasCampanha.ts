import apiCampanha from "../api/ApiCampanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";
const authService = require("../services/Autenticacao");
const express = require("express");

const router = express.Router();


router.route("/campanhas")
    .get(authService, async (req: any, res: any): Promise<ICampanhaModel[]> => {
        const campanhas: ICampanhaModel[] = await apiCampanha.todasAsCampanhas();
        return res.json(campanhas);
    })
    .post(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const novaCampanha: ICampanhaModel = await apiCampanha.criarCampanha(req.body);
        return res.json(novaCampanha);
    })

router.route("/campanha/:url")
    .get(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const campanha: ICampanhaModel = await apiCampanha.campanhaByUrl(req.params.url);
        return res.json(campanha);
    })


module.exports = router;