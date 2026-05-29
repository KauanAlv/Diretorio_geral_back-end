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
const controllerFilmeDiretor = require('../filme/controller_filme_diretor.js')
const controllerFilme = require('../filme/controller_filme.js')

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
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let resultBuscarDiretor = await buscarDiretor(id)

            if (resultBuscarDiretor.status) {
                let validar = await validarDados(diretor)

                if (!validar) {
                    diretor.id = Number(id)
                    let result = await diretorDAO.updateDiretor(diretor)

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = diretor

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

const listarDiretor = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorDAO.selectAllDiretor()

        if (result) {
            if (result.length > 0) {

                for (let diretor of result) {
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)

                    if (resultSexo.status) {
                        diretor.sexo = resultSexo.response.sexo
                        delete diretor.id_sexo
                    }

                    // Buscar todos os filmes feito por aquele diretor
                    let resultFilmes = await controllerFilmeDiretor.buscarFilmesIdDiretor(diretor.id)
                    if (resultFilmes.status) {
                        // Se retornou true, faz uma busca de todos os dados do filme, exceto as ligações da tabela
                        for (let filme of resultFilmes.response.filme_diretor) {
                            
                            // Agora sim motra TODOS os dados do filme, com todas as ligações
                            let dadosFilme = await controllerFilme.buscarFilme(filme.id) 
                            if (dadosFilme.status) {
                                // Se tiver tudo certinho, no response do diretor aparece o filme
                                diretor.filme = dadosFilme.response.filme
                            }
                        }
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor = result

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

const buscarDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorDAO.selectByIdDiretor(id)

            if (result) {
                if (result.length > 0) {

                    for (let diretor of result) {
                        let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)

                        if (resultSexo.status) {
                            diretor.sexo = resultSexo.response.sexo
                            delete diretor.id_sexo
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor = result

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

const excluirDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarDiretor = await buscarDiretor(id)

        if (resultBuscarDiretor.status) {
            let result = await diretorDAO.deleteDiretor(id)

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