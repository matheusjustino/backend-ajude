import apiCampanha from "../api/ApiCampanha";
import ICampanhaModel from "../interfaces/ICampanhaModel";
import comentarioModel from "../models/Comentario";
const authService = require("../services/Autenticacao");
const express = require("express");

const router = express.Router();


router.route("/campanhas")
    .get(authService, async (req: any, res: any): Promise<ICampanhaModel[]> => {
        const campanhas: ICampanhaModel[] = await apiCampanha.todasAsCampanhas();
        if (campanhas === null) {
            return res.json({ msg: "Nenhuma campanha cadastrada" });
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
                return res.json({ msg: "nomeCurto já existente" });
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
            return res.status(400).json({ msg: "Campanha não encontrada" })
        } else {
            return res.json(campanha);
        }
    })
    .post(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const campanha: ICampanhaModel = await apiCampanha.fazerDoacao(req.params.url, req.body.doacoes);
        if (campanha === null) {
            return res.status(400).json({ msg: "Campanha não encontrada "});
        } else {
            return res.json(campanha);
        }
    })
    .put(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const campanha: ICampanhaModel = await apiCampanha.atualizarCampanha(req.params.url, req.body, req.userId, res);
        if (campanha === null) {
            return res.status(400).json({ msg: "Campanha não encontrada "});
        } else {
            return res.json(campanha);
        }
    })

router.route("/campanha/:url/comentar")
    .post(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        let comentario = new comentarioModel(req.body);
        comentario.dono = req.userId;
        const campanha: ICampanhaModel = await apiCampanha.fazerComentario(req.params.url, comentario);
        return res.json(campanha);
    })

router.route("/campanha/:url/responder")
    .post(authService, async (req: any, res: any): Promise<ICampanhaModel> => {
        const resposta = {
            texto: req.body.texto,
            dono: req.userId
        };
        const campanha: ICampanhaModel = await apiCampanha.responderComentario(req.params.url, resposta, req.body.idComentario);
        return res.json(campanha);
    })

router.route("/campanhas/melhores-campanhas")
    .get(async (req: any, res: any): Promise<ICampanhaModel[]> => {
        const campanhas: any = await apiCampanha.melhoresCampanhas();
        if (campanhas === null) {
            return res.status(400).json({ msg: "Nenhuma campanha cadastrada" });
        } else {
            return res.json(campanhas);
        }
    })

module.exports = router;