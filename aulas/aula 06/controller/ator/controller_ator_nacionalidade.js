/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Ator Nacionalidade.
 * Data: 04/06/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const atorNacionalidadeDAO = require('../../model/DAO/ator_nacionalidade/ator_nacionalidade.js')

const inserirNovoAtorNacionalidade = async function (atorNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validacao = await validarDados(atorNacionalidade)

        if (validacao) {
            return validacao // 400
        } else {
            let result = await atorNacionalidadeDAO.insertAtorNacionalidade(atorNacionalidade)

            if (result) {
                atorNacionalidade.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = atorNacionalidade

                return customMessage.DEFAULT_MESSAGE // 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarAtorNacionalidade = async function (atorNacionalidade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarAtorNacionalidade = await buscarAtorNacionalidade(id)

        if (resultBuscarAtorNacionalidade.status) {
            let validar = await validarDados(atorNacionalidade)

            if (!validar) {
                atorNacionalidade.id = Number(id)
                let result = await atorNacionalidadeDAO.updateAtorNacionalidade(atorNacionalidade)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = atorNacionalidade

                    return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            } else {
                return validar // 400 de dados
            }
        } else {
            return resultBuscarAtorNacionalidade // (id) 400, 404, 500 da controller/model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarAtorNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorNacionalidadeDAO.selectAllAtorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

const buscarAtorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await atorNacionalidadeDAO.selectByIdAtorNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

//Função para buscar as nacionalidades filtrando pelo ID do Ator
const buscarNacionalidadeByIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await atorNacionalidadeDAO.selectNacionalidadesByIdAtor(idAtor)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

//Função para buscar os Atores filtrando pelo ID da Nacionalidade
const buscarAtorByIdNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await atorNacionalidadeDAO.selectAtoresByIdNacionalidade(idNacionalidade)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator_nacionalidade = result

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

const excluirAtorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarAtorNacionalidade = await buscarAtorNacionalidade(id)

        if (resultBuscarAtorNacionalidade.status) {
            let result = await atorNacionalidadeDAO.deleteAtorNacionalidade(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarAtorNacionalidade // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Nacionalidade com o Ator
const excluirNacionalidadesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await atorNacionalidadeDAO.deleteNacionalidadesByIdAtor(idAtor)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Ator com o Nacionalidade
const excluirAtoresIdNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await atorNacionalidadeDAO.deleteAtoresByIdNacionalidade(idNacionalidade)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (atorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (atorNacionalidade.id_ator == undefined || atorNacionalidade.id_ator == '' || atorNacionalidade.id_ator == null || isNaN(atorNacionalidade.id_ator) || atorNacionalidade.id_ator.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else if (atorNacionalidade.id_nacionalidade == undefined || atorNacionalidade.id_nacionalidade == '' || atorNacionalidade.id_nacionalidade == null || isNaN(atorNacionalidade.id_nacionalidade) || atorNacionalidade.id_nacionalidade.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDA'
    } else {
        return false
    }
    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoAtorNacionalidade,
    atualizarAtorNacionalidade,
    listarAtorNacionalidade,
    buscarAtorNacionalidade,
    buscarNacionalidadeByIdAtor,
    buscarAtorByIdNacionalidade,
    excluirAtorNacionalidade,
    excluirNacionalidadesIdAtor,
    excluirAtoresIdNacionalidade
}