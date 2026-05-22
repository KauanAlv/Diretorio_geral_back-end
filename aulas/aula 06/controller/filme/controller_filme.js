/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de filme.
 * Data: 17/04/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

//Import do arquivo do DAO para manipular os dados de filme no Banco de Dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Import das Controlles
const controllerClassificacao = require('../classificacao/controller_classificacao.js')
const controllerFilmeGenero = require('./controller_filme_genero.js')

//Função para validar os dados de cadastro do filme
const validarDados = async function (filme) {

    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if (filme.nome == undefined || filme.nome == '' || filme.nome == null || filme.nome.length > 80) {
        customMessage.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.sinopse == undefined || filme.sinopse == '' || filme.sinopse == null) {
        customMessage.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.capa == undefined || filme.capa == '' || filme.capa == null || filme.capa.length > 255) {
        customMessage.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.data_lancamento == undefined || filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento.length != 10) {
        customMessage.ERROR_BAD_REQUEST.field = '[DATA DE LANÇAMENTO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.duracao == undefined || filme.duracao == '' || filme.duracao == null || filme.duracao.length < 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5) {
        customMessage.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        customMessage.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST

        // Validação para a FK da classificação (Chave Estrangeira)
    } else if (filme.id_classificacao == undefined || filme.id_classificacao == '' || filme.id_classificacao == null || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0) {
        customMessage.ERROR_BAD_REQUEST.field = '[ID_CLASSIFICAÇÃO] INVÁLIDA'
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (filme) {
    //Tratamento para eliminar a chegada da aspas (') como caracter inválido
    filme.nome = filme.nome.replaceAll("'", "")
    filme.sinopse = filme.sinopse.replaceAll("'", "")
    filme.capa = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao = filme.duracao.replaceAll("'", "")
    filme.valor = filme.valor.replaceAll("'", "")
    filme.avaliacao = filme.avaliacao.replaceAll("'", "")

    return filme
}

//Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para validar a entrada dos dados do filme
            let validacao = await validarDados(filme)

            //Retorna um JSON de erro caso algum atributo seja invalido,
            //senão retorna um false (Não teve erro)
            if (validacao) {
                return validacao //retorna um status_code 400
            } else {
                //Encaminha os dados do filme para o DAO inserir no Banco de Dados
                let result = await filmeDAO.insertFilme(await tratarDados(filme))

                if (result) { //retorna um status_code 201
                    //Cria o ID no JSON do filme e adiciona o ID gerado no DAO
                    filme.id = result


                    /********** Manipulação de dados para Inserir os Generos relacionados ao Filme **********/

                    //Percorre o array de generos que chegará na requisição pelo objeto Filme
                    for (let genero of filme.genero) {
                        let filmeGenero = {
                            "id_filme": filme.id,
                            "id_genero": genero.id
                        }

                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero)
                        console.log(resultFilmeGenero)
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filme

                    return customMessage.DEFAULT_MESSAGE // 201
                } else { //retorna um status_code 500 (Model)
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
                }
            }
        } else {
            return customMessage.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

//Função para atualizar um filme existente
const atualizarFilme = async function (filme, id, contentType) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para verificar se o conteúdo do Body é um JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função para buscar o filme e validar se o ID está correto,
            //Se o ID existe no Banco de dados e se o Filme existe
            let resultBuscarFilme = await buscarFilme(id)

            if (resultBuscarFilme.status) {
                //Chama a função para validar os dados para a alteração do filme (Dados do Body)
                let validar = await validarDados(filme)

                if (!validar) {

                    //Adiciona um atributo ID no JSON de filme, para enviar ao DAO um único objeto
                    filme.id = Number(id)

                    //Chama a função para atualizar o filme no Banco de Dados
                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if (result) {
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                        customMessage.DEFAULT_MESSAGE.response = filme

                        return customMessage.DEFAULT_MESSAGE // 200 (Atualizado)
                    } else {
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500 (Na model)
                    }
                } else {
                    return validar //ERRO 400 de validação dos campos do banco de dados

                }
            } else {
                return resultBuscarFilme //Devolve um 400 (ID inválido), 404 (Não encontrado) ou 500 (Na Controller ou na Model)
            }

        } else {
            return customMessage.ERROR_CONTENT_TYPE // 415, não recebeu um JSON
        }

    } catch (error) {
        customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para retornar todos os filmes existentes
const listarFilme = async function () {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função do DAO para retornar a lista de filmes do Banco de Dados
        let result = await filmeDAO.selectAllFilme()

        //Validação para verificar se o DAO conseguiu processar o script no Banco de Dados
        if (result) {
            //Validação para verificar se o conteúdo do Array tem dados de retorno ou se está vazio
            if (result.length > 0) {

                //Manipulação dos dados da Classificação
                //Percorre o array de filmes
                for (let filme of result) {
                    //Busca na controller da classificação o ID referente a FK da classificação
                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                    //Se encontrar o ID
                    if (resultClassificacao.status) {
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassificacao.response.classificacao
                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE // 200
            } else {
                return customMessage.ERROR_NOT_FOUND // 404
            }
        } else {
            return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na Model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na Controller
    }
}

//Função para retornar um filme filtrando pelo ID
const buscarFilme = async function (id) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um número válido
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400, id inválido
        } else {
            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)

            //Valdação para verificar se o DAO retornou dados ou um false (ERRO)
            if (result) {
                //Validação para verificar se o DAO tem algum dado no Array
                if (result.length > 0) {

                    //Manipulação dos dados da Classificação
                    //Percorre o array de filmes
                    for (let filme of result) {
                        //Busca na controller da classificação o ID referente a FK da classificação
                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)

                        //Se encontrar o ID
                        if (resultClassificacao.status) {
                            //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                            filme.classificacao = resultClassificacao.response.classificacao
                            //Apaga o id_classificação do JSON de filme
                            delete filme.id_classificacao
                        }
                    }

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE // 200
                } else {
                    return customMessage.ERROR_NOT_FOUND // 404, não encontrou nada
                }
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na Model
            }
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na Controller
    }
}

//Função para excluir um filme
const excluirFilme = async function (id) {
    //Cria uma cópia dos JSONs do arquivo de configuração de mensagens
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Chama a função de buscar filme para validar se o filme existe
        let resultBuscarFilme = await buscarFilme(id)

        if (resultBuscarFilme.status) {
            //Chama a função do DAO para excluir o filme
            let result = await filmeDAO.deleteFilme(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200 ou 204, filme deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarFilme // Retorna 400 (ID inválido), 404 (ID não encontrado)
        }
    } catch (error) {
        customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}