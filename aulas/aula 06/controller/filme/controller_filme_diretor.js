/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Filme Diretor.
 * Data: 22/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do diretor do filme no Banco de Dados
const filmeDiretorDAO = require('../../model/DAO/filme_diretor/filme_diretor.js')

const inserirNovoFilmeDiretor = async function (filmeDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validacao = await validarDados(filmeDiretor)

        if (validacao) {
            return validacao // 400
        } else {
            let result = await filmeDiretorDAO.insertFilmeDiretor(filmeDiretor)

            if (result) {
                filmeDiretor.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = filmeDiretor

                return customMessage.DEFAULT_MESSAGE // 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarFilmeDiretor = async function (filmeDiretor, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarFilmeDiretor = await buscarFilmeDiretor(id)

        if (resultBuscarFilmeDiretor.status) {
            let validar = await validarDados(filmeDiretor)

            if (!validar) {
                filmeDiretor.id = Number(id)
                let result = await filmeDiretorDAO.updateFilmeDiretor(filmeDiretor)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeDiretor

                    return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            } else {
                return validar // 400 de dados
            }
        } else {
            return resultBuscarFilmeDiretor // (id) 400, 404, 500 da controller/model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarFilmeDiretor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeDiretorDAO.selectAllFilmeDiretor()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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

const buscarFilmeDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeDiretorDAO.selectByIdFilmeDiretor(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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
const buscarDiretoresIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idFilme == undefined || String(idFilme).replaceAll(' ', '') == '' || idFilme == null || isNaN(idFilme) || idFilme < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeDiretorDAO.selectDiretoresByIdFilme(idFilme)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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
const buscarFilmesIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await filmeDiretorDAO.selectFilmesByIdDiretor(idDiretor)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme_diretor = result

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

const excluirFilmeDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarFilmeDiretor = await buscarFilmeDiretor(id)

        if (resultBuscarFilmeDiretor.status) {
            let result = await filmeDiretorDAO.deleteFilmeDiretor(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarFilmeDiretor // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de diretores com o Filme
const excluirDiretoresIdFilme = async function (idFilme) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await filmeDiretorDAO.deleteDiretoresByIdFilme(idFilme)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (filmeDiretor) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (filmeDiretor.id_filme == undefined || filmeDiretor.id_filme == '' || filmeDiretor.id_filme == null || isNaN(filmeDiretor.id_filme) || filmeDiretor.id_filme.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
    } else if (filmeDiretor.id_diretor == undefined || filmeDiretor.id_diretor == '' || filmeDiretor.id_diretor == null || isNaN(filmeDiretor.id_diretor) || filmeDiretor.id_diretor.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else {
        return false
    }
    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoFilmeDiretor,
    atualizarFilmeDiretor,
    listarFilmeDiretor,
    buscarFilmeDiretor,
    excluirFilmeDiretor,
    buscarDiretoresIdFilme,
    buscarFilmesIdDiretor,
    excluirDiretoresIdFilme
}