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

    for (let itemUsuario of contatos) {
        if (itemUsuario.number == String(numeroWhatsapp)) {
            dados.nome = itemUsuario.account
            dados.nick = itemUsuario.nickname
            dados.foto = itemUsuario['profile-image']
            dados.numero = itemUsuario.number
            dados.background = itemUsuario.background
            dados.dados_conta = {
                "inicio": itemUsuario['created-since'].start,
                "fim": itemUsuario['created-since'].end
            }
        }
    }

    if (dados.numero != numeroWhatsapp)
        return false

    return dados
}

const getContatosUsuario = function (numeroWhatsapp) {
    let dados = {
        "contatos": []
    }

    for (let usuario of contatos) {
        if (usuario.number == String(numeroWhatsapp)) {
            usuario.contacts.forEach(function (contatoUsuario) {
                dados.contatos.push({
                    "nome": contatoUsuario.name,
                    "foto": contatoUsuario.image,
                    "descricao": contatoUsuario.description
                })
            })
        }
    }

    if (dados.contatos.length == 0)
        return false
    return dados
}

const getMensagemUsuario = function (numeroWhatsapp) {
    let dados = {}

    for (let usuario of contatos) {
        if (usuario.number == String(numeroWhatsapp)) {
            dados.contatos = usuario.contacts
        }
    }

    //Se não receber nenhuma chave no json, retorna 0
    if (Object.keys(dados).length == 0)
        return false

    return dados
}

const getContatoMensagem = function (numeroWhatsapp, nomeContato) {
    let dados = {
        "usuario": false,
        "numero": numeroWhatsapp,
        "contato": false,
        "mensagens": []
    }
    let nome = String(nomeContato).toLowerCase()

    for (let usuario of contatos) {
        if (usuario.number == String(numeroWhatsapp)) {
            dados.usuario = usuario.account

            usuario.contacts.forEach(function (itemContato) {
                let nomeListaContatos = itemContato.name.toLowerCase()

                if (nome === nomeListaContatos) {
                    dados.contato = itemContato.name

                    itemContato.messages.forEach(function (itensMensagem) {
                        dados.mensagens.push({
                            "remetente": itensMensagem.sender,
                            "conteudo": itensMensagem.content,
                            "horario": itensMensagem.time
                        })
                    })
                }
            })
        }
    }

    if (dados.mensagens.length == 0)
        return false
    return dados
}

const filtrarMensagem = function (mensagens, palavraChave) {
    if (!palavraChave)
        return false

    const busca = palavraChave.toLowerCase()
    let resultado = []

    for (let msg of mensagens) {
        let conversas = (msg.conteudo || "").toLowerCase()

        if (conversas.includes(busca)) {
            resultado.push(msg)
        }
    }

    if (resultado.length == 0)
        return false

    return resultado
}

module.exports = {
    getDadosGerais,
    getDadosUsuario,
    getContatosUsuario,
    getMensagemUsuario,
    getContatoMensagem,
    filtrarMensagem
}