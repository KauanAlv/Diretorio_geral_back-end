/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Classificação Indicativa.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do genero do filme no Banco de Dados
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')

const inserirNovaClassificacao = async function (classificacao, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(classificacao)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await classificacaoDAO.insertClassificacao(classificacao)

                if (result) {
                    classificacao.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

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

const atualizarClassificacao = async function (classificacao, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarClassificacao = await buscarClassificacao(id)

            if (resultBuscarClassificacao.status) {
                let validar = await validarDados(classificacao)

                if (!validar) {
                    classificacao.id = Number(id)
                    let result = await classificacaoDAO.updateClassificacao(classificacao)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = classificacao

                        return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                    }
                } else {
                    return validar // 400 de dados
                }
            } else {
                return resultBuscarClassificacao // (id) 400, 404, 500 da controller/model
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarClassificacao = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await classificacaoDAO.selectAllClassificacao()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.classificacao = result

                return customMessage.DEFAULT_MESSAGE // 200
            } else {
                return customMessage.ERROR_NOT_FOUND // 404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller 
    }
}

const buscarClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result

                    return customMessage.DEFAULT_MESSAGE // 200
                } else {
                    return customMessage.ERROR_NOT_FOUND // 404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const excluirClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarClassificacao = await buscarClassificacao(id)

        if (resultBuscarClassificacao.status) {
            let result = await classificacaoDAO.deleteClassificacao(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarClassificacao // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (classificacao) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (classificacao.classificacao == undefined || classificacao.classificacao == '' || classificacao.classificacao == null || classificacao.classificacao.length > 5) {
        customMessages.ERROR_BAD_REQUEST.field = '[CLASSIFICAÇÃO INDICATIVA] INVÁLIDA'
    } else if (classificacao.descricao == undefined || classificacao.descricao == '') {
        customMessages.ERROR_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
    } else if (classificacao.idade_minima == undefined || classificacao.idade_minima < 0 || isNaN(classificacao.idade_minima)) {
        customMessages.ERROR_BAD_REQUEST.field = '[IDADE MÍNIMA] INVÁLIDA'
    } else {
        return false
    }

    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovaClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao
}