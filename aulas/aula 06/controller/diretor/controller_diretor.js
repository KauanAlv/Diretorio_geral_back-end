/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de diretor.
 * Data: 20/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const diretorDAO = require('../../model/DAO/diretor/diretor.js')

//Import das Controlles
const controllerSexo = require('../sexo/controller_sexo.js')

const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(diretor)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await diretorDAO.insertDiretor(diretor)

                if (result) {
                    diretor.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretor

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

const AtualizarDiretor = async function (diretor, id, contentType) {

}

const listarDiretor = async function () {

}

const buscarDiretor = async function (id) {

}

const excluirDiretor = async function (id) {

}

const validarDados = async function (diretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (diretor.nome == undefined || diretor.nome == '' || diretor.nome == null || diretor.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == '' || diretor.data_nascimento == null || diretor.data_nascimento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (diretor.inicio_carreira == undefined || diretor.inicio_carreira == '' || diretor.inicio_carreira == null || isNaN(diretor.inicio_carreira) || diretor.inicio_carreira.length != 4) {
        customMessage.ERROR_BAD_REQUEST.field = '[INICIO CARREIRA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

        // Validação para a FK do sexo (Chave Estrangeira)
    } else if (diretor.id_sexo == undefined || diretor.id_sexo == '' || diretor.id_sexo == null || isNaN(diretor.id_sexo) || diretor.id_sexo < 1) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }

}

module.exports = {
    inserirNovoDiretor,
    AtualizarDiretor,
    listarDiretor,
    buscarDiretor,
    excluirDiretor
}