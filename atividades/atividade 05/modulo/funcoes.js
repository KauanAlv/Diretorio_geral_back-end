/********************************************************************************************************
 * Objetivo: Arquivo responsável por conter todas as funções que faz a busca pelos contatos do Whatsapp
 * Autor: Kauan Alves Pereira
 * Data: 08/04/2026 - (quarta-feira)
 * Versão 1.0
********************************************************************************************************/

let arquivo = require('./contatos.js')
const contatos = arquivo.contatos['whats-users']

const getDadosGerais = function () {
    return { contatos }
}

const getDadosUsuario = function (numeroWhatsapp) {
    let dados = {}

    for (let itemContato of contatos) {
        if (itemContato.number == String(numeroWhatsapp)) {
            dados.nome = itemContato.account
            dados.nick = itemContato.nickname
            dados.foto = itemContato['profile-image']
            dados.numero = itemContato.number
            dados.background = itemContato.background
            dados.dados_conta = {
                "inicio": itemContato['created-since'].start,
                "fim": itemContato['created-since'].end
            }
        }
    }

    if (dados.numero != numeroWhatsapp)
        return false

    return dados
}

console.log(getDadosGerais())
console.log(getDadosUsuario(11987876567))