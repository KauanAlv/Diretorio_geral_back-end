/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de filme.
 * Data: 17/04/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Função para validar os dados de cadastro do filme
const validarDados = async function (filme) {

    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else {
        return false
    }
}

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para validar a entrada dos dados do filme
            let validacao = await validarDados(filme)

            //Retorna um JSON de erro caso algum atributo seja invalido,
            //senão retorna um false (Não teve erro)
            if (validacao) {
                return validacao //retorna um status_code 400
            } else {
                //Encaminha os dados do filme para o DAO inserir no Banco de Dados
                let result = await filmeDAO.insertFilme(filme)

                if (result) { //retorna um status_code 201
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

                    return customMessage.DEFAULT_MESSAGE // 201
                } else { //retorna um status_code 500 (Model)
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para atualizar um filme existente
const atualizarFilme = async function () {

}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {

}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function () {

}

//Função para excluir um filme
const excluirFilme = async function () {

}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}