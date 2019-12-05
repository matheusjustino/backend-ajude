export default {
    likeOuDislike: (idUsuario: String, valor: Number, arrayLikesEDislikes: Array<any>) => {
        function contaLikesEDislikes (array: Array<any>) {
            const like = array.reduce((acumulador: any, elemento: any) => elemento.valor === 1 ? acumulador += 1 : false, 0);
            const dislike = array.reduce((acumulador: any, elemento: any) => elemento.valor === 2 ? acumulador += 1 : false, 0);
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
    }
}