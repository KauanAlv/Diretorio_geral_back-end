/***********************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação de dados
 *      para realizar o CRUD de Diretor Atividade.
 * Data: 05/06/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão: 1.0
 ***********************************************************************************/

//Import do arquivo de configurações de mensagens do projeto
const configMessages = require('../modulo/configMessages.js')

const diretorAtividadeDAO = require('../../model/DAO/diretor_atividade/diretor_atividade.js')

const inserirNovoDiretorAtividade = async function (diretorAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let validacao = await validarDados(diretorAtividade)

        if (validacao) {
            return validacao // 400
        } else {
            let result = await diretorAtividadeDAO.insertDiretorAtividade(diretorAtividade)

            if (result) {
                diretorAtividade.id = result

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                customMessage.DEFAULT_MESSAGE.response = diretorAtividade

                return customMessage.DEFAULT_MESSAGE // 201
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const atualizarDiretorAtividade = async function (diretorAtividade, id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        let resultBuscarDiretorAtividade = await buscarDiretorAtividade(id)

        if (resultBuscarDiretorAtividade.status) {
            let validar = await validarDados(diretorAtividade)

            if (!validar) {
                diretorAtividade.id = Number(id)
                let result = await diretorAtividadeDAO.updateDiretorAtividade(diretorAtividade)

                if (result) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_UPDATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_UPDATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_UPDATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretorAtividade

                    return customMessage.DEFAULT_MESSAGE // 200 (atualizado)
                } else {
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
                }
            } else {
                return validar // 400 de dados
            }
        } else {
            return resultBuscarDiretorAtividade // (id) 400, 404, 500 da controller/model
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const listarDiretorAtividade = async function () {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await diretorAtividadeDAO.selectAllDiretorAtividade()

        if (result) {
            if (result.length > 0) {
                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.response.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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

const buscarDiretorAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (id == undefined || String(id).replaceAll(' ', '') == '' || id == null || isNaN(id) || id < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorAtividadeDAO.selectByIdDiretorAtividade(id)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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

//Função para buscar as atividades filtrando pelo ID do Diretor
const buscarAtividadeByIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idDiretor == undefined || String(idDiretor).replaceAll(' ', '') == '' || idDiretor == null || isNaN(idDiretor) || idDiretor < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorAtividadeDAO.selectAtividadesByIdDiretor(idDiretor)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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

//Função para buscar os diretores filtrando pelo ID da Atividade
const buscarDiretorByIdAtividade = async function (idAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if (idAtividade == undefined || String(idAtividade).replaceAll(' ', '') == '' || idAtividade == null || isNaN(idAtividade) || idAtividade < 1) {
            customMessage.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return customMessage.ERROR_BAD_REQUEST // 400
        } else {
            let result = await diretorAtividadeDAO.selectDiretoresByIdAtividade(idAtividade)

            if (result) {
                if (result.length > 0) {
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor_atividade = result

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

const excluirDiretorAtividade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarDiretorAtividade = await buscarDiretorAtividade(id)

        if (resultBuscarDiretorAtividade.status) {
            let result = await diretorAtividadeDAO.deleteDiretorAtividade(id)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }
        } else {
            return resultBuscarDiretorAtividade // (id) 400, 404, 500 da controller/model
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Atividade com o Diretor
const excluirAtividadesIdDiretor = async function (idDiretor) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await diretorAtividadeDAO.deleteAtividadesByIdDiretor(idDiretor)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

//Função para excluir a relação de Diretor com o Atividade
const excluirDiretoresIdAtividade = async function (idAtividade) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
            let result = await diretorAtividadeDAO.deleteDiretoresByIdAtividade(idAtividade)

            if (result) {
                return customMessage.SUCCESS_DELETED_ITEM // 200, 204 deletado com sucesso
            } else {
                return customMessage.ERROR_INTERNAL_SERVER_MODEL // 500, na model
            }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500, na controller
    }
}

const validarDados = async function (diretorAtividade) {
    let customMessages = JSON.parse(JSON.stringify(configMessages))

    if (diretorAtividade.id_diretor == undefined || diretorAtividade.id_diretor == '' || diretorAtividade.id_diretor == null || isNaN(diretorAtividade.id_diretor) || diretorAtividade.id_diretor.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_DIRETOR] INVÁLIDO'
    } else if (diretorAtividade.id_atividade == undefined || diretorAtividade.id_atividade == '' || diretorAtividade.id_atividade == null || isNaN(diretorAtividade.id_atividade) || diretorAtividade.id_atividade.length < 1) {
        customMessages.ERROR_BAD_REQUEST.field = '[ID_ATIVIDADE] INVÁLIDA'
    } else {
        return false
    }
    return customMessages.ERROR_BAD_REQUEST
}

module.exports = {
    inserirNovoDiretorAtividade,
    atualizarDiretorAtividade,
    listarDiretorAtividade,
    buscarDiretorAtividade,
    buscarAtividadeByIdDiretor,
    buscarDiretorByIdAtividade,
    excluirDiretorAtividade,
    excluirAtividadesIdDiretor,
    excluirDiretoresIdAtividade
}