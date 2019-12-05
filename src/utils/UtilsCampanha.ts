function orderna(campanhaA: any, campanhaB: any) {
    return campanhaA > campanhaB ? 1 : campanhaA < campanhaB ? -1 : 0;
}

export default {
    likeOuDislike: (idUsuario: String, valor: Number, arrayLikesEDislikes: Array<any>) => {
        function contaLikesEDislikes(array: Array<any>) {
            const like = array.reduce((acumulador: any, elemento: any) => elemento.valor === 1 ? acumulador += 1 : acumulador += 0, 0);
            const dislike = array.reduce((acumulador: any, elemento: any) => elemento.valor === 2 ? acumulador += 1 : acumulador += 0, 0);
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

    temPermissão: (emailUsuario: String, donoCampanha: any, ) => {
        return emailUsuario === donoCampanha;
    },

    alteraStatus: (campanha: any) => {
        if (parseFloat(campanha.meta) === parseFloat(campanha.doacoes)) {
            campanha.status = "Concluída";
            return campanha;
        }
        const data = campanha.deadline.split("/");
        const dataAgora = new Date();
        if (data[2] >= dataAgora.getFullYear()) {
            if (data[1] >= dataAgora.getMonth() + 1) {
                if (data[0] >= dataAgora.getDate()) {
                    return campanha;
                } else {
                    campanha.status = "Vencida";
                    return campanha;
                }
            } else {
                campanha.status = "Vencida";
                return campanha;
            }
        } else {
            campanha.status = "Vencida";
            return campanha;
        }
    },

    ordenaPorMeta(campanhaA: any, campanhaB: any) {
        return orderna(parseFloat(campanhaA.meta) - parseFloat(campanhaA.doacoes), parseFloat(campanhaB.meta) - parseFloat(campanhaB.doacoes));
    },

    ordenaPorData(campanhaA: any, campanhaB: any) {
        const dataA = campanhaA.deadline.split("-");
        const dataB = campanhaB.deadline.split("-");
        if (orderna(parseInt(dataA[2]), parseInt(dataB[2])) === 0) {
            if (orderna(parseInt(dataA[1]), parseInt(dataB[1])) === 0) {
                return orderna(parseInt(dataA[0]), parseInt(dataB[0]));
            } else {
                return orderna(parseInt(dataA[1]), parseInt(dataB[1]));
            }
        } else {
            return orderna(parseInt(dataA[2]), parseInt(dataB[2]));
        }
    },

    ordernaPorLikes(campanhaA: any, campanhaB: any) {
        return orderna(campanhaB.likes, campanhaA.likes);
    }
}