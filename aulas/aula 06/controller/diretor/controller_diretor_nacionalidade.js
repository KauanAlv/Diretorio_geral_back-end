/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Diretor Nacionalidade.
 * Data: 04/06/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const diretorNacionalidadeDAO = require('../../model/DAO/diretor_nacionalidade/diretor_nacionalidade.js')

const inserirNovoDiretorNacionalidade = async function (diretorNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validacao = await validarDados(diretorNacionalidade)

        if (validacao) {
            return validacao // 400
        } else {
            let result = await diretorNacionalidadeDAO.insertDiretorNacionalidade(diretorNacionalidade)

            if (result) {
                diretorNacionalidade.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = diretorNacionalidade

                return customMessage.DEFAULT_MESSAGE // 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarDiretorNacionalidade = async function (diretorNacionalidade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarDiretorNacionalidade = await buscarDiretorNacionalidade(id)

        if (resultBuscarDiretorNacionalidade.status) {
            let validar = await validarDados(diretorNacionalidade)

            if (!validar) {
                diretorNacionalidade.id = Number(id)
                let result = await diretorNacionalidadeDAO.updateDiretorNacionalidade(diretorNacionalidade)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretorNacionalidade

                    return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            } else {
                return validar // 400 de dados
            }
        } else {
            return resultBuscarDiretorNacionalidade // (id) 400, 404, 500 da controller/model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarDiretorNacionalidade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorNacionalidadeDAO.selectAllDiretorNacionalidade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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

const buscarDiretorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorNacionalidadeDAO.selectByIdDiretorNacionalidade(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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

//Função para buscar as nacionalidades filtrando pelo ID do Diretor
const buscarNacionalidadeByIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorNacionalidadeDAO.selectNacionalidadesByIdDiretor(idDiretor)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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

//Função para buscar os diretores filtrando pelo ID da Nacionalidade
const buscarDiretorByIdNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idNacionalidade == undefined || String(idNacionalidade).replaceAll(' ', '') == '' || idNacionalidade == null || isNaN(idNacionalidade) || idNacionalidade < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorNacionalidadeDAO.selectDiretoresByIdNacionalidade(idNacionalidade)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_nacionalidade = result

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

const excluirDiretorNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarDiretorNacionalidade = await buscarDiretorNacionalidade(id)

        if (resultBuscarDiretorNacionalidade.status) {
            let result = await diretorNacionalidadeDAO.deleteDiretorNacionalidade(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarDiretorNacionalidade // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Nacionalidade com o Diretor
const excluirNacionalidadesIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await diretorNacionalidadeDAO.deleteNacionalidadesByIdDiretor(idDiretor)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Diretor com o Nacionalidade
const excluirDiretoresIdNacionalidade = async function (idNacionalidade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await diretorNacionalidadeDAO.deleteDiretoresByIdNacionalidade(idNacionalidade)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (diretorNacionalidade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretorNacionalidade.id_diretor == undefined || diretorNacionalidade.id_diretor == '' || diretorNacionalidade.id_diretor == null || isNaN(diretorNacionalidade.id_diretor) || diretorNacionalidade.id_diretor.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else if (diretorNacionalidade.id_nacionalidade == undefined || diretorNacionalidade.id_nacionalidade == '' || diretorNacionalidade.id_nacionalidade == null || isNaN(diretorNacionalidade.id_nacionalidade) || diretorNacionalidade.id_nacionalidade.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_NACIONALIDADE] INVÁLIDA'
    } else {
        return false
    }
    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorNacionalidade,
    atualizarDiretorNacionalidade,
    listarDiretorNacionalidade,
    buscarDiretorNacionalidade,
    buscarNacionalidadeByIdDiretor,
    buscarDiretorByIdNacionalidade,
    excluirDiretorNacionalidade,
    excluirNacionalidadesIdDiretor,
    excluirDiretoresIdNacionalidade
}