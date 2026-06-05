/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de genero do filme.
 * Data: 08/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados do genero do filme no Banco de Dados
const generoDAO = require('../../model/DAO/genero/genero.js')
const controllerFilmeGenero = require('../filme/controller_filme_genero.js')
const controllerFilme = require('../filme/controller_filme.js')

const inserirNovoGenero = async function (genero, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para validar a entrada dos dados do genero do filme
            let validacao = await validarDados(genero)

            //Retorna um JSON de erro caso algum atributo seja invalido,
            //senão retorna um false (Não teve erro)
            if (validacao) {
                return validacao // 400, validação incorreta
            } else {
                if (genero.filme !== undefined && !Array.isArray(genero.filme)) {
                    return customMessage.ERROR_BAD_REQUEST
                }
                //Encaminha os dados do genero do filme para o DAO inserir no Banco de Dados
                let result = await generoDAO.insertGenero(genero)

                if (result) {
                    //Cria o ID no JSON do genero do filme e adiciona o ID gerado no DAO
                    genero.id = result

                    if (Array.isArray(genero.filme)) {
                        for (let filme of genero.filme) {
                            let generoFilme = {
                                "id_filme": filme.id,
                                "id_genero": genero.id
                            }
                            let resultGeneroFilme = await controllerFilmeGenero.inserirNovoFilmeGenero(generoFilme)
                            if (!resultGeneroFilme.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                            }
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = genero

                    return customMessage.DEFAULT_MESSAGE // 201, item criado
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415, não é JSON
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarGenero = async function (genero, id, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o gênero e validar se o ID está correto,
            //Se o ID existe no Banco de dados e se o gênero existe
            let resultBuscarGenero = await buscarGenero(id)

            if (resultBuscarGenero.status) {
                //Chama a função para validar os dados para a alteração do gênero (Dados do Body)
                let validar = await validarDados(genero)

                if (!validar) {
                    if (genero.filme !== undefined && !Array.isArray(genero.filme)) {
                        return customMessage.ERROR_BAD_REQUEST
                    }
                    //Adiciona um atributo ID no JSON de gênero, para enviar ao DAO um único objeto
                    genero.id = Number(id)

                    //Chama a função para atualizar o filme no Banco de Dados
                    let result = await generoDAO.updateGenero(genero)

                    if (result) {
                        if (Array.isArray(genero.filme)) {
                            let resultDeleteFilmes = await controllerFilmeGenero.excluirFilmesIdGenero(genero.id)
                            if (resultDeleteFilmes.status) {
                                for (let filme of genero.filme) {
                                    let generoFilme = {
                                        "id_filme": filme.id,
                                        "id_genero": genero.id
                                    }

                                    let resultGeneroFilme = await controllerFilmeGenero.inserirNovoFilmeGenero(generoFilme)
                                    if (!resultGeneroFilme.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = genero

                        return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                    }
                } else {
                    return validar
                }
            } else {
                return resultBuscarGenero // 400, 404 ou 500 da controller/model
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarGenero = async function () {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let result = await generoDAO.selectAllGenero()

        if (result) {
            if (result.length > 0) {
                for (let genero of result) {
                    // Buscar todos os filmes ligados por aquele genero
                    let resultFilmes = await controllerFilmeGenero.buscarFilmesIdGenero(genero.id)
                    if (resultFilmes.status) {
                        // Se retornou true, faz uma busca de todos os dados do filme, exceto as ligações da tabela
                        genero.filme = []
                        for (let filme of resultFilmes.response.filme_genero) {
                            // Agora sim motra TODOS os dados do filme, com todas as ligações
                            let dadosFilme = await controllerFilme.buscarFilme(filme.id)
                            if (dadosFilme.status) {
                                // Se tiver tudo certinho, no response do diretor aparece o filme
                                genero.filme = genero.filme.concat(dadosFilme.response.filme)
                            }
                        }
                    }
                }
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.genero = result

                return customMessage.DEFAULT_MESSAGE // 200
            } else {
                return customMessage.ERROR_NOT_FOUND // 404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na Model
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na Controller
    }
}

const buscarGenero = async function (id) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um número válido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400, id inválido
        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await generoDAO.selectByIdGenero(id)

            //Valdação para verificar se o DAO retornou dados ou um false (ERRO)
            if (result) {
                //Validação para verificar se o DAO tem algum dado no Array
                if (result.length > 0) {

                    for (let genero of result) {
                        let resultGeneroFilme = await controllerFilmeGenero.buscarFilmesIdGenero(genero.id)
                        if (resultGeneroFilme.status) {
                            genero.filme = resultGeneroFilme.response.filme_genero
                        }
                    }
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.genero = result

                    return customMessage.DEFAULT_MESSAGE // 200
                } else {
                    return customMessage.ERROR_NOT_FOUND // 404
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }

    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const excluirGenero = async function (id) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função de buscar filme para validar se o filme existe
        let resultBuscarGenero = await buscarGenero(id)

        if (resultBuscarGenero.status) {
            //Chama a função do DAO para excluir o gênero
            let result = await generoDAO.deleteGenero(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarGenero // 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (genero) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (genero.genero == undefined || genero.genero == '' || genero.genero == null || genero.genero.length > 30) {
        customMessage.ERROR_BAD_REQUEST.field = '[GÊNERO] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

module.exports = {
    inserirNovoGenero,
    atualizarGenero,
    listarGenero,
    buscarGenero,
    excluirGenero
}
