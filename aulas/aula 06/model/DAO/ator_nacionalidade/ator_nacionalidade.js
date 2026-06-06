/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Ator e Nacionalidade no Banco de Dados MySQL.
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


const insertAtorNacionalidade = async function (atorNacionalidade) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_ator_nacionalidade (
        id_ator,
        id_nacionalidade
        ) values (
         ${atorNacionalidade.id_ator},
         ${atorNacionalidade.id_nacionalidade}
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

const updateAtorNacionalidade = async function (atorNacionalidade) {
    try {
        let sql =
            `update tbl_ator_nacionalidade set
                id_ator  = ${atorNacionalidade.id_ator},
                id_nacionalidade = ${atorNacionalidade.id_nacionalidade}
            where id = ${atorNacionalidade.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorNacionalidade = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_ator_nacionalidade order by id desc;'

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

const selectByIdAtorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_ator_nacionalidade where id = ${id};`

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

const selectNacionalidadesByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_nacionalidade.*

                    from tbl_ator
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade
                            
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

const selectAtoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = ` select tbl_ator.*

                    from tbl_ator
                        inner join tbl_ator_nacionalidade
                            on tbl_ator.id = tbl_ator_nacionalidade.id_ator
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_ator_nacionalidade.id_nacionalidade

                    where tbl_nacionalidade.id = ${idNacionalidade};`

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

const deleteAtorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as nacionalidades relacionados com um ator
//Obs: Esta função será utilizada no put do ator (apaga a nacionalidade de acordo com o id do ator)
const deleteNacionalidadesByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id_ator = ${idAtor};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os atores relacionados com uma nacionalidade
//Obs: Esta função será utilizada no put da nacionalidade (apaga o ator de acordo com o id da nacionalidades)
const deleteAtoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `delete from tbl_ator_nacionalidade where id_nacionalidade = ${idNacionalidade};`

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
    insertAtorNacionalidade,
    updateAtorNacionalidade,
    selectAllAtorNacionalidade,
    selectByIdAtorNacionalidade,
    selectNacionalidadesByIdAtor,
    selectAtoresByIdNacionalidade,
    deleteAtorNacionalidade,
    deleteNacionalidadesByIdAtor,
    deleteAtoresByIdNacionalidade
}