/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Filme Ator.
 * Data: 06/06/2026 - (sábado)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do diretor do filme no Banco de Dados
const filmeAtorDAO = require('../../model/DAO/filme_ator/filme_ator.js')

const inserirNovoFilmeAtor = async function (filmeAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validacao = await validarDados(filmeAtor)

        if (validacao) {
            return validacao // 400
        } else {
            let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)

            if (result) {
                filmeAtor.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeAtor

                return customMessage.DEFAULT_MESSAGE // 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarFilmeAtor = async function (filmeAtor, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarFilmeAtor = await buscarFilmeAtor(id)

        if (resultBuscarFilmeAtor.status) {
            let validar = await validarDados(filmeAtor)

            if (!validar) {
                filmeAtor.id = Number(id)
                let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeAtor

                    return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            } else {
                return validar // 400 de dados
            }
        } else {
            return resultBuscarFilmeAtor // (id) 400, 404, 500 da controller/model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarFilmeAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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

const buscarFilmeAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeAtorDAO.selectByIdFilmeAtor(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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

//Função para buscar os diretores filtrando pelo ID do Filme
const buscarAtoresIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeAtorDAO.selectAtoresByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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

//Função para buscar os filmes filtrando pelo ID do Diretor
const buscarFilmesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtor == undefined || String(idAtor).replaceAll(' ', '') == '' || idAtor == null || isNaN(idAtor) || idAtor < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeAtorDAO.selectFilmesByIdAtor(idAtor)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

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

const excluirFilmeAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilmeAtor = await buscarFilmeAtor(id)

        if (resultBuscarFilmeAtor.status) {
            let result = await filmeAtorDAO.deleteFilmeAtor(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarFilmeAtor // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de diretores com o Filme
const excluirAtoresIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.deleteAtoresByIdFilme(idFilme)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const excluirFilmesIdAtor = async function (idAtor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.deleteFilmesByIdAtor(idAtor)

        if (result) {
            return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (filmeAtor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filmeAtor.id_filme == undefined || filmeAtor.id_filme == '' || filmeAtor.id_filme == null || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
    } else if (filmeAtor.id_ator == undefined || filmeAtor.id_ator == '' || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_ATOR] INVÁLIDO'
    } else {
        return false
    }
    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeAtor,
    atualizarFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    excluirFilmeAtor,
    buscarAtoresIdFilme,
    buscarFilmesIdAtor,
    excluirAtoresIdFilme,
    excluirFilmesIdAtor
}