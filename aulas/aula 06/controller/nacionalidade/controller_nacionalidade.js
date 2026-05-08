/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD da nacionalidade.
 * Data: 08/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do genero do filme no Banco de Dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')

const inserirNovoNacionalidade = async function (nacionalidade, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validacao = await validarDados(nacionalidade)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                if (result) {
                    nacionalidade.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidade

                    return customMessage.DEFAULT_MESSAGE // 201
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller 
    }
}

const atualizarNacionalidade = async function (nacionalidade, id, contentType) {

}

const listarNacionalidade = async function () {

}

const buscarNacionalidade = async function () {

}

const excluirNacionalidade = async function () {

}

const validarDados = async function (nacionalidade) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (nacionalidade.nacionalidade == undefined || nacionalidade.nacionalidade == '' || nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 25) {
        customMessage.ERROR_BAD_REQUEST.field = '[GÊNERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovoNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade
}