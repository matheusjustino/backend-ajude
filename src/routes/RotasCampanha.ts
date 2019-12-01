import apiCampanha from "../api/ApiCampanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";
const authService = require("../services/Autenticacao");
const express = require("express");

const router = express.Router();


router.route("/campanhas")
    .get(authService, async (req: any, res: any): Promise<ICampanhaModel[]> => {
        const campanhas: ICampanhaModel[] = await apiCampanha.todasAsCampanhas();
        if (campanhas === null) {
            return res.json("Nenhuma campanha cadastrada");
        } else {
            return res.json(campanhas);
        }
    })
    .post(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        try {
            const novaCampanha: ICampanhaModel = await apiCampanha.criarCampanha(req.body);
            return res.json(novaCampanha);
        } catch (error) {
            if (error.errmsg.includes("nomeCurto")) {
                return res.json("nomeCurto já existente");
            } else if (error.errmsg.includes("url")) {
                return res.json("url já existente");
            } else {
                return res.json(error);
            }
        }
        //const novaCampanha: ICampanhaModel = await apiCampanha.criarCampanha(req.body);
        //return res.json(novaCampanha);
    })

router.route("/campanha/:url")
    .get(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const campanha: ICampanhaModel = await apiCampanha.campanhaByUrl(req.params.url);
        if (campanha === null) {
            return res.json("Campanha não encontrada")
        } else {
            return res.json(campanha);
        }
    })


module.exports = router;