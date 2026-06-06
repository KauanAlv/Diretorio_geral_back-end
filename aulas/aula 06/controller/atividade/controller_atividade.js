/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Atividade profissional.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')


const atividadeDAO = require('../../model/DAO/atividade/atividade.js')
const controllerDiretorAtividade = require('../diretor/controller_diretor_atividade.js')
const controllerAtorAtividade = require('../ator/controller_ator_atividade.js')

const inserirNovaAtividade = async function (atividade, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(atividade)

            if (validacao) {
                return validacao // 400 (dados)
            } else {

                let result = await atividadeDAO.insertAtividade(atividade)
                if (result) {
                    atividade.id = result

                    if (Array.isArray(atividade.diretor)) {
                        for (let diretor of atividade.diretor) {
                            let atividadeDiretor = {
                                "id_diretor": diretor.id,
                                "id_atividade": atividade.id
                            }
                            let resultAtividadeDiretor = await controllerDiretorAtividade.inserirNovoDiretorAtividade(atividadeDiretor)
                            if (!resultAtividadeDiretor.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                            }
                        }
                    }

                    if (Array.isArray(atividade.ator)) {
                        for (let ator of atividade.ator) {
                            let atividadeAtor = {
                                "id_ator": ator.id,
                                "id_atividade": atividade.id
                            }
                            let resultAtividadeAtor = await controllerAtorAtividade.inserirNovoAtorAtividade(atividadeAtor)
                            if (!resultAtividadeAtor.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                            }
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atividade

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

const atualizarAtividade = async function (atividade, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarAtividade = await buscarAtividade(id)

            if (resultBuscarAtividade.status) {
                let validar = await validarDados(atividade)

                if (!validar) {
                    atividade.id = Number(id)
                    let result = await atividadeDAO.updateAtividade(atividade)

                    if (result) {
                        if (Array.isArray(atividade.diretor)) {
                            let resultDeleteDiretores = await controllerDiretorAtividade.excluirDiretoresIdAtividade(atividade.id)
                            if (resultDeleteDiretores.status) {
                                for (let diretor of atividade.diretor) {
                                    let atividadeDiretor = {
                                        "id_diretor": diretor.id,
                                        "id_atividade": atividade.id
                                    }

                                    let resultAtividadeDiretor = await controllerDiretorAtividade.inserirNovoDiretorAtividade(atividadeDiretor)
                                    if (!resultAtividadeDiretor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        if (Array.isArray(atividade.ator)) {
                            let resultDeleteAtores = await controllerAtorAtividade.excluirAtoresIdAtividade(atividade.id)
                            if (resultDeleteAtores.status) {
                                for (let ator of atividade.ator) {
                                    let atividadeAtor = {
                                        "id_ator": ator.id,
                                        "id_atividade": atividade.id
                                    }

                                    let resultAtividadeAtor = await controllerAtorAtividade.inserirNovoAtorAtividade(atividadeAtor)
                                    if (!resultAtividadeAtor.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = atividade

                        return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                    }
                } else {
                    return validar // 400 de dados
                }
            } else {
                return resultBuscarAtividade // (id) 400, 404, 500 da controller/model
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarAtividade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atividadeDAO.selectAllAtividade()

        if (result) {
            if (result.length > 0) {
                for (let atividade of result) {

                    let resultDiretores = await controllerDiretorAtividade.buscarDiretorByIdAtividade(atividade.id)

                    if (resultDiretores.status) {
                        atividade.diretor = resultDiretores.response.diretor_atividade
                    }

                    let resultAtores = await controllerAtorAtividade.buscarAtorByIdAtividade(atividade.id)

                    if (resultAtores.status) {
                        atividade.ator = resultAtores.response.ator_atividade
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.atividade = result

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

const buscarAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400 (dados)
        } else {
            let result = await atividadeDAO.selectByIdAtividade(id)

            if (result) {
                if (result.length > 0) {
                    for (let atividade of result) {
                        let resultAtividadeDiretor = await controllerDiretorAtividade.buscarDiretorByIdAtividade(atividade.id)
                        if (resultAtividadeDiretor.status) {
                            atividade.diretor = resultAtividadeDiretor.response.diretor_atividade
                        }

                        let resultAtividadeAtor = await controllerAtorAtividade.buscarAtorByIdAtividade(atividade.id)
                        if (resultAtividadeAtor.status) {
                            atividade.ator = resultAtividadeAtor.response.ator_atividade
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.atividade = result

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

const excluirAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarAtividade = await buscarAtividade(id)

        if (resultBuscarAtividade.status) {
            let result = await atividadeDAO.deleteAtividade(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204, deletado com sucesso
            } else {
                customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarAtividade // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (atividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (atividade.area_atuacao == undefined || atividade.area_atuacao == '' || atividade.area_atuacao == null || atividade.area_atuacao.length > 40) {
        customMessage.ERROR_BAD_REQUEST.field = '[ATIVIDADE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (atividade.diretor !== undefined && !Array.isArray(atividade.diretor)) {
        return customMessage.ERROR_BAD_REQUEST

    } else if (atividade.ator !== undefined && !Array.isArray(atividade.ator)) {
        return customMessage.ERROR_BAD_REQUEST
    }
    else {
        return false
    }
}

module.exports = {
    inserirNovaAtividade,
    atualizarAtividade,
    listarAtividade,
    buscarAtividade,
    excluirAtividade
}