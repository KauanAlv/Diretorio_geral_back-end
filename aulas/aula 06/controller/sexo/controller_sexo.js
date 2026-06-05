/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Sexo.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const inserirNovoSexo = async function (sexo, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(sexo)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await sexoDAO.insertSexo(sexo)

                if (result) {
                    sexo.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = sexo

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

const atualizarSexo = async function (sexo, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarSexo = await buscarSexo(id)

            if (resultBuscarSexo.status) {
                let validar = await validarDados(sexo)

                if (!validar) {
                    sexo.id = Number(id)
                    let result = await sexoDAO.updateSexo(sexo)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = sexo

                        return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                    }
                } else {
                    return validar // 400 de dados
                }
            } else {
                return resultBuscarSexo // (id) 400, 404, 500 da controller/model
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415 
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarSexo = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await sexoDAO.selectAllSexo()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.sexo = result

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

const buscarSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await sexoDAO.selectByIdSexo(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.sexo = result

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

const excluirSexo = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarSexo = await buscarSexo(id)

        if (resultBuscarSexo.status) {
            let result = await sexoDAO.deleteSexo(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarSexo // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (sexo) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (sexo.sigla == undefined || sexo.sigla == '' || sexo.sigla == null || sexo.sigla.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[SIGLA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else if (sexo.sexo == undefined || sexo.sexo == '' || sexo.sexo == null || sexo.sexo.length > 15) {
        customMessage.ERROR_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovoSexo,
    atualizarSexo,
    listarSexo,
    buscarSexo,
    excluirSexo
}