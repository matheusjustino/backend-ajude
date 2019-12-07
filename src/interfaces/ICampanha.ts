interface Campanha {
    nomeCurto: String,
    url: String,
    descricao: String,
    deadline: String,
    status: String,
    meta: String,
    doacoes: String,
    dono: String,
    comentarios: Array<any>
    like: Number,
    dislike: Number
}

export default Campanha;