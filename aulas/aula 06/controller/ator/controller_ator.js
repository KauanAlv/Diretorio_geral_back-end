/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de ator.
 * Data: 22/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const atorDAO = require('../../model/DAO/ator/ator.js')

//Import das Controlles
const controllerSexo = require('../sexo/controller_sexo.js')

const controllerFilmeAtor = require('../filme/controller_filme_ator.js')
const controllerAtorNacionalidade = require('./controller_ator_nacionalidade.js')

const inserirNovoAtor = async function (ator, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(ator)

            if (validacao) {
                return validacao // 400
            } else {
                let result = await atorDAO.insertAtor(ator)

                if (result) {
                    ator.id = result

                    if (Array.isArray(ator.filme)) {
                        for (let filme of ator.filme) {
                            let atorFilme = {
                                "id_filme": filme.id,
                                "id_ator": ator.id
                            }
                            let resultAtorFilme = await controllerFilmeAtor.inserirNovoFilmeAtor(atorFilme)
                            if (!resultAtorFilme.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                            }
                        }
                    }

                    if (Array.isArray(ator.nacionalidade)) {
                        for (let nacionalidade of ator.nacionalidade) {
                            let atorNacionalidade = {
                                "id_ator": ator.id,
                                "id_nacionalidade": nacionalidade.id
                            }

                            let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade)

                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if (!resultAtorNacionalidade.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                            }
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator

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

const AtualizarAtor = async function (ator, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarAtor = await buscarAtor(id)

            if (resultBuscarAtor.status) {
                let validar = await validarDados(ator)

                if (!validar) {
                    ator.id = Number(id)
                    let result = await atorDAO.updateAtor(ator)

                    if (result) {
                        if (Array.isArray(ator.filme)) {
                            let resultDeleteFilmes = await controllerFilmeAtor.excluirFilmesIdAtor(ator.id)
                            if (resultDeleteFilmes.status) {
                                for (let filme of ator.filme) {
                                    let atorFilme = {
                                        "id_filme": filme.id,
                                        "id_ator": ator.id
                                    }

                                    let resultAtorFilme = await controllerFilmeAtor.inserirNovoFilmeAtor(atorFilme)
                                    if (!resultAtorFilme.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        let resultDeleteNacionalidades = await controllerAtorNacionalidade.excluirNacionalidadesIdAtor(ator.id)
                        if (resultDeleteNacionalidades.status) {
                            if (Array.isArray(ator.nacionalidade)) {
                                for (let nacionalidade of ator.nacionalidade) {
                                    let atorNacionalidade = {
                                        "id_ator": ator.id,
                                        "id_nacionalidade": nacionalidade.id
                                    }
                                    let resultAtorNacionalidade = await controllerAtorNacionalidade.inserirNovoAtorNacionalidade(atorNacionalidade)

                                    if (!resultAtorNacionalidade.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = ator

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

const listarAtor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await atorDAO.selectAllAtor()

        if (result) {
            if (result.length > 0) {

                for (let ator of result) {
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                    if (resultSexo.status) {
                        ator.sexo = resultSexo.response.sexo
                        delete ator.id_sexo
                    }

                    let resultFilme = await controllerFilmeAtor.buscarFilmesIdAtor(ator.id)
                    if (resultFilme.status) {
                        ator.filme = resultFilme.response.filme_ator
                    }

                    let resultNacionalidades = await controllerAtorNacionalidade.buscarNacionalidadeByIdAtor(ator.id)
                    if (resultNacionalidades.status) {
                        ator.nacionalidade = resultNacionalidades.response.ator_nacionalidade
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator = result

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

const buscarAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await atorDAO.selectByIdAtor(id)

            if (result) {
                if (result.length > 0) {

                    for (let ator of result) {
                        let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)

                        if (resultSexo.status) {
                            ator.sexo = resultSexo.response.sexo
                            delete ator.id_sexo
                        }

                        let resultAtorFilme = await controllerFilmeAtor.buscarFilmesIdAtor(ator.id)
                        if (resultAtorFilme.status) {
                            ator.filme = resultAtorFilme.response.filme_ator
                        }

                        let resultAtorNacionalidade = await controllerAtorNacionalidade.buscarNacionalidadeByIdAtor(ator.id)
                        if (resultAtorNacionalidade.status) {
                            ator.nacionalidade = resultAtorNacionalidade.response.ator_nacionalidade
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

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

const excluirAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarAtor = await buscarAtor(id)

        if (resultBuscarAtor.status) {
            let result = await atorDAO.deleteAtor(id)

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

const validarDados = async function (ator) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (ator.nome == undefined || ator.nome == '' || ator.nome == null || ator.nome.length > 100) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.data_nascimento == undefined || ator.data_nascimento == '' || ator.data_nascimento == null || ator.data_nascimento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE NASCIMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.inicio_carreira == undefined || ator.inicio_carreira == '' || ator.inicio_carreira == null || isNaN(ator.inicio_carreira) || ator.inicio_carreira.length != 4) {
        customMessage.ERROR_BAD_REQUEST.field = '[INICIO CARREIRA] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST


    } else if (ator.biografia == undefined || ator.biografia == '' || ator.biografia == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[BIOGRAFIA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

        // Validação para a FK do sexo (Chave Estrangeira)
    } else if (ator.id_sexo == undefined || ator.id_sexo == '' || ator.id_sexo == null || isNaN(ator.id_sexo) || ator.id_sexo < 1) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_SEXO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.filme !== undefined && !Array.isArray(ator.filme)) {
        return customMessage.ERROR_BAD_REQUEST

    } else if (ator.nacionalidade !== undefined && !Array.isArray(ator.nacionalidade)) {
        return customMessage.ERROR_BAD_REQUEST

    } else {
        return false
    }

}

module.exports = {
    inserirNovoAtor,
    AtualizarAtor,
    listarAtor,
    buscarAtor,
    excluirAtor
}