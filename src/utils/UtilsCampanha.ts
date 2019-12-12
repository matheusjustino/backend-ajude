import ICampanhaModel from "../interfaces/ICampanhaModel";

function orderna(campanhaA: number, campanhaB: number) {
    return campanhaA > campanhaB ? 1 : campanhaA < campanhaB ? -1 : 0;
}

export default {
    geraUrl: (url: string): string => {
        return url.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\-]+/g, '-');
    },

    likeOuDislike: (idUsuario: string, valor: number, arrayLikesEDislikes: Array<any>) => {
        function contaLikesEDislikes(array: Array<any>) {
            const like = array.reduce((acumulador: number, elemento: any) => elemento.valor === 1 ? acumulador += 1 : acumulador += 0, 0);
            const dislike = array.reduce((acumulador: number, elemento: any) => elemento.valor === 2 ? acumulador += 1 : acumulador += 0, 0);
            return { like, dislike };
        }

        for (let i = 0; i < arrayLikesEDislikes.length; i++) {
            if (arrayLikesEDislikes[i].dono === idUsuario) {
                arrayLikesEDislikes[i].valor = arrayLikesEDislikes[i].valor === valor ? 0 : valor;
                const { like, dislike } = contaLikesEDislikes(arrayLikesEDislikes);
                return { like, dislike, arrayLikesEDislikes };
            }
        }

        arrayLikesEDislikes.push({ "dono": idUsuario, "valor": valor });
        const { like, dislike } = contaLikesEDislikes(arrayLikesEDislikes);
        return { like, dislike, arrayLikesEDislikes };
    },

    alteraStatus: (campanha: ICampanhaModel | any) => {
        if (parseFloat(campanha.meta) <= parseFloat(campanha.doacoes)) {
            campanha.status = "Concluída";
            return campanha;
        }
        const [dia, mes, ano] = campanha.deadline.split("/");
        const dataCampanhaValueOf = new Date(ano, mes, dia).valueOf();
        const dataAgora = new Date().valueOf();
        campanha.status = dataCampanhaValueOf >= dataAgora ? campanha.status : "Vencida";
        return campanha;
    },

    ordenaPorMeta(campanhaA: ICampanhaModel, campanhaB: ICampanhaModel) {
        return orderna(parseFloat(campanhaA.meta) - parseFloat(campanhaA.doacoes), parseFloat(campanhaB.meta) - parseFloat(campanhaB.doacoes));
    },

    ordenaPorData(campanhaA: ICampanhaModel | any, campanhaB: ICampanhaModel | any) {
        const dataA = campanhaA.deadline.split("-");
        const dataB = campanhaB.deadline.split("-");
        return orderna(new Date(dataA[2], dataA[1], dataA[0]).valueOf(), new Date(dataB[2], dataB[1], dataB[0]).valueOf());
    },

    ordernaPorLikes(campanhaA: ICampanhaModel, campanhaB: ICampanhaModel) {
        return orderna(campanhaB.like, campanhaA.dislike);
    }
}