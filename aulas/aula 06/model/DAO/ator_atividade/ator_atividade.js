/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Ator e Atividade no Banco de Dados MySQL.
 * Data: 06/06/2026 - (sábado)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
**********************************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertAtorAtividade = async function (atorAtividade) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_ator_atividade (
        id_ator,
        id_atividade
        ) values (
         ${atorAtividade.id_ator},
         ${atorAtividade.id_atividade}
        );`

        //Executa para o banco de dados o scriptSQL
        let result = await knexConection.raw(sql)

        //Valida a execução da inserção
        if (result)
            return result[0].insertId //Ao invés de retornar "true", retorna o ID gerado no insert
        else
            return false

    } catch (error) {
        return false
    }
}

const updateAtorAtividade = async function (atorAtividade) {
    try {
        let sql =
            `update tbl_ator_atividade set
                id_ator  = ${atorAtividade.id_ator},
                id_atividade = ${atorAtividade.id_atividade}
            where id = ${atorAtividade.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorAtividade = async function () {

    try {
        let sql = 'select * from tbl_ator_atividade order by id desc;'

        //Executa no banco de dados o script e guarda o retorno do banco,
        //Pode ser um ERRO (false) ou um Array (de acordo com o Knex) com os dados.
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdAtorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_ator_atividade where id = ${id};`

        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAtividadesByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_atividade.*

                    from tbl_ator
                        inner join tbl_ator_atividade
                            on tbl_ator.id = tbl_ator_atividade.id_ator
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_ator_atividade.id_atividade
                            
                    where tbl_ator.id = ${idAtor};`

        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAtoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = ` select tbl_ator.*

                    from tbl_ator
                        inner join tbl_ator_atividade
                            on tbl_ator.id = tbl_ator_atividade.id_ator
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_ator_atividade.id_atividade

                    where tbl_atividade.id = ${idAtividade};`

        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteAtorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_ator_atividade where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as atividades relacionados com um Ator
//Obs: Esta função será utilizada no put do Ator (apaga a atividade de acordo com o id do Ator)
const deleteAtividadesByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_atividade where id_ator = ${idAtor};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os Atores relacionados com uma atividade
//Obs: Esta função será utilizada no put da atividade (apaga o Ator de acordo com o id da atividade)
const deleteAtoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = `delete from tbl_ator_atividade where id_atividade = ${idAtividade};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    insertAtorAtividade,
    updateAtorAtividade,
    selectAllAtorAtividade,
    selectByIdAtorAtividade,
    selectAtividadesByIdAtor,
    selectAtoresByIdAtividade,
    deleteAtorAtividade,
    deleteAtividadesByIdAtor,
    deleteAtoresByIdAtividade
}