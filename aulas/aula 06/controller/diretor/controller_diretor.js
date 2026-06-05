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
const controllerFilme = require('../filme/controller_filme.js')
const controllerFoto = require('../foto/controller_foto.js')
const controllerNacionalidade = require('../nacionalidade/controller_nacionalidade.js')
const controllerAtividade = require('../atividade/controller_atividade.js')

const controllerFilmeDiretor = require('../filme/controller_filme_diretor.js')
const controllerDiretorFoto = require('./controller_diretor_foto.js')
const controllerDiretorNacionalidade = require('./controller_diretor_nacionalidade.js')
const controllerDiretorAtividade = require('./controller_diretor_atividade.js')

const inserirNovoDiretor = async function (diretor, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validacao = await validarDados(diretor)

            if (validacao) {
                return validacao // 400
            } else {
                if (diretor.filme !== undefined && !Array.isArray(diretor.filme)) {
                    return customMessage.ERROR_BAD_REQUEST // 400
                }

                if (diretor.foto !== undefined && !Array.isArray(diretor.foto)) {
                    return customMessage.ERROR_BAD_REQUEST // 400
                }

                if (diretor.nacionalidade !== undefined && !Array.isArray(diretor.nacionalidade)) {
                    return customMessage.ERROR_BAD_REQUEST // 400
                }

                if (diretor.atividade !== undefined && !Array.isArray(diretor.atividade)) {
                    return customMessage.ERROR_BAD_REQUEST // 400
                }

                let result = await diretorDAO.insertDiretor(diretor)

                if (result) {
                    diretor.id = result

                    /********** Manipulação de dados para Inserir os Diretores relacionados ao Filme **********/

                    //Percorre o array de diretores que chegará na requisição pelo objeto Filme
                    if (Array.isArray(diretor.filme)) {
                        for (let filme of diretor.filme) {
                            let diretorFilme = {
                                "id_filme": filme.id,
                                "id_diretor": diretor.id
                            }

                            let resultDiretorFilme = await controllerFilmeDiretor.inserirNovoFilmeDiretor(diretorFilme)

                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if (!resultDiretorFilme.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                            }
                        }
                    }

                    if (Array.isArray(diretor.foto)) {
                        for (let foto of diretor.foto) {
                            let diretorFoto = {
                                "id_diretor": diretor.id,
                                "id_foto": foto.id
                            }

                            let resultDiretorFoto = await controllerDiretorFoto.inserirNovoDiretorFoto(diretorFoto)

                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if (!resultDiretorFoto.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                            }
                        }
                    }

                    if (Array.isArray(diretor.nacionalidade)) {
                        for (let nacionalidade of diretor.nacionalidade) {
                            let diretorNacionalidade = {
                                "id_diretor": diretor.id,
                                "id_nacionalidade": nacionalidade.id
                            }

                            let resultDiretorNacionalidade = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(diretorNacionalidade)

                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if (!resultDiretorNacionalidade.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                            }
                        }
                    }

                    if (Array.isArray(diretor.atividade)) {
                        for (let atividade of diretor.atividade) {
                            let diretorAtividade = {
                                "id_diretor": diretor.id,
                                "id_atividade": atividade.id
                            }

                            let resultDiretorAtividade = await controllerDiretorAtividade.inserirNovoDiretorAtividade(diretorAtividade)

                            //Validação para verificar se todos os itens de relacionamento foram inseridos
                            if (!resultDiretorAtividade.status) {
                                return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201 com alerta de cadastro
                            }
                        }
                    }

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
                    if (diretor.filme !== undefined && !Array.isArray(diretor.filme)) {
                        return customMessage.ERROR_BAD_REQUEST
                    }

                    if (diretor.foto !== undefined && !Array.isArray(diretor.foto)) {
                        return customMessage.ERROR_BAD_REQUEST // 400
                    }

                    if (diretor.nacionalidade !== undefined && !Array.isArray(diretor.nacionalidade)) {
                        return customMessage.ERROR_BAD_REQUEST // 400
                    }

                    if (diretor.atividade !== undefined && !Array.isArray(diretor.atividade)) {
                        return customMessage.ERROR_BAD_REQUEST // 400
                    }

                    diretor.id = Number(id)
                    let result = await diretorDAO.updateDiretor(diretor)

                    if (result) {
                        let resultDeleteFilmes = await controllerFilmeDiretor.excluirFilmesIdDiretor(diretor.id)

                        if (resultDeleteFilmes.status) {
                            if (Array.isArray(diretor.filme)) {
                                for (let filme of diretor.filme) {
                                    let diretorFilme = {
                                        "id_filme": filme.id,
                                        "id_diretor": diretor.id
                                    }

                                    let resultDiretorFilme = await controllerFilmeDiretor.inserirNovoFilmeDiretor(diretorFilme)

                                    if (!resultDiretorFilme.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        let resultDeleteFotos = await controllerDiretorFoto.excluirFotosIdDiretor(diretor.id)
                        if (resultDeleteFotos.status) {
                            if (Array.isArray(diretor.foto)) {
                                for (let foto of diretor.foto) {
                                    let diretorFoto = {
                                        "id_diretor": diretor.id,
                                        "id_foto": foto.id
                                    }
                                    let resultDiretorFoto = await controllerDiretorFoto.inserirNovoDiretorFoto(diretorFoto)

                                    if (!resultDiretorFoto.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        let resultDeleteNacionalidades = await controllerDiretorNacionalidade.excluirNacionalidadesIdDiretor(diretor.id)
                        if (resultDeleteNacionalidades.status) {
                            if (Array.isArray(diretor.nacionalidade)) {
                                for (let nacionalidade of diretor.nacionalidade) {
                                    let diretorNacionalidade = {
                                        "id_diretor": diretor.id,
                                        "id_nacionalidade": nacionalidade.id
                                    }
                                    let resultDiretorNacionalidade = await controllerDiretorNacionalidade.inserirNovoDiretorNacionalidade(diretorNacionalidade)

                                    if (!resultDiretorNacionalidade.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

                        let resultDeleteAtividades = await controllerDiretorAtividade.excluirAtividadesIdDiretor(diretor.id)
                        if (resultDeleteAtividades.status) {
                            if (Array.isArray(diretor.atividade)) {
                                for (let atividade of diretor.atividade) {
                                    let diretorAtividade = {
                                        "id_diretor": diretor.id,
                                        "id_atividade": atividade.id
                                    }
                                    let resultDiretorAtividade = await controllerDiretorAtividade.inserirNovoDiretorAtividade(diretorAtividade)

                                    if (!resultDiretorAtividade.status) {
                                        return customMessage.SUCCESS_CREATED_ITEM_WARNING // 201
                                    }
                                }
                            }
                        }

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
                return resultBuscarDiretor // (id) 400, 404, 500 da controller/model
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
                        diretor.filme = resultFilmes.response.filme_diretor
                    }

                    let resultFotos = await controllerDiretorFoto.buscarFotosIdDiretor(diretor.id)
                    if (resultFotos.status) {
                        diretor.foto = []
                        for (let foto of resultFotos.response.diretor_foto) {

                            let dadosFoto = await controllerFoto.buscarFoto(foto.id)
                            if (dadosFoto.status) {
                                diretor.foto = diretor.foto.concat(dadosFoto.response.foto)
                            }
                        }
                    }

                    let resultNacionalidades = await controllerDiretorNacionalidade.buscarNacionalidadeByIdDiretor(diretor.id)
                    if (resultNacionalidades.status) {
                        diretor.nacionalidade = resultNacionalidades.response.diretor_nacionalidade
                    }

                    let resultAtividades = await controllerDiretorAtividade.buscarAtividadeByIdDiretor(diretor.id)
                    if (resultAtividades.status) {
                        diretor.atividade = []
                        for (let atividade of resultAtividades.response.diretor_atividade) {

                            let dadosAtividade = await controllerAtividade.buscarAtividade(atividade.id)
                            if (dadosAtividade.status) {
                                diretor.atividade = diretor.atividade.concat(dadosAtividade.response.atividade)
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
        console.log(error)
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

                        let resultDiretorFilme = await controllerFilmeDiretor.buscarFilmesIdDiretor(diretor.id)
                        if (resultDiretorFilme.status) {
                            diretor.filme = resultDiretorFilme.response.filme_diretor
                        }

                        let resultDiretorFoto = await controllerDiretorFoto.buscarFotosIdDiretor(diretor.id)
                        if (resultDiretorFoto.status) {
                            diretor.foto = resultDiretorFoto.response.diretor_foto
                        }

                        let resultDiretorNacionalidade = await controllerDiretorNacionalidade.buscarNacionalidadeByIdDiretor(diretor.id)
                        if (resultDiretorNacionalidade.status) {
                            diretor.nacionalidade = resultDiretorNacionalidade.response.diretor_nacionalidade
                        }

                        let resultDiretorAtividade = await controllerDiretorAtividade.buscarAtividadeByIdDiretor(diretor.id)
                        if (resultDiretorAtividade.status) {
                            diretor.atividade = resultDiretorAtividade.response.diretor_atividade
                        }''
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