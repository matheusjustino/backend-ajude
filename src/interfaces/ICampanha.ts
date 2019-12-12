interface Campanha {
    nomeCurto: string,
    url: string,
    descricao: string,
    deadline: string,
    status: string,
    meta: string,
    doacoes: string,
    dono: string,
    comentarios: Array<any>,
    likesEDislikes: Array<any>,
    like: number,
    dislike: number
}

export default Campanha;