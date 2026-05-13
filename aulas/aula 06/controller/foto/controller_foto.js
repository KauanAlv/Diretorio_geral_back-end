/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Foto.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do genero do filme no Banco de Dados
const fotoDAO = require('../../model/DAO/foto/foto.js')

const inserirNovaFoto = async function (foto, contentType) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(foto)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await fotoDAO.insertFoto(foto)

                if (result) {
                    foto.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = foto

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

const atualizarFoto = async function (foto, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarFoto = await buscarFoto(id)

            if (resultBuscarFoto.status) {
                let validar = await validarDados(foto)

                if (!validar) {
                    foto.id = Number(id)
                    let result = await fotoDAO.updateFoto(foto)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = foto

                        return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                    }
                } else {
                    return validar // 400 de dados
                }
            } else {
                return resultBuscarFoto // (id) 400, 404, 500 da controller/model
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarFoto = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await fotoDAO.selectAllFoto()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.foto = result

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

const buscarFoto = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await fotoDAO.selectByIdFoto(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.foto = result

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

const excluirFoto = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFoto = await buscarFoto(id)

        if (resultBuscarFoto.status) {
            let result = await fotoDAO.deleteFoto(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarFoto // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (foto) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (foto.foto == undefined || foto.foto == '' || foto.foto == null || foto.foto.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[FOTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovaFoto,
    atualizarFoto,
    listarFoto,
    buscarFoto,
    excluirFoto
}