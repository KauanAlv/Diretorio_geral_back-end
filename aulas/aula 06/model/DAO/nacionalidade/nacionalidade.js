/***********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da nacionalidade no Banco de Dados MySQL.
 * Data: 08/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
***********************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertNacionalidade = async function (nacionalidade) {
    try {

        let sql = `insert into tbl_nacionalidade (
        nacionalidade
        ) values (
         replace ("${nacionalidade.nacionalidade}", "'", "")
         );`

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            false
    } catch (error) {
        return false
    }
}

const updateNacionalidade = async function (nacionalidade) {
    try {
        let sql = 
        `update tbl_nacionalidade set
            nacionalidade = replace("${nacionalidade.nacionalidade}", "'", "")
        where id = ${nacionalidade.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
        
    } catch (error) {
        return false
    }
}

const selectAllNacionalidade = async function () {

    try {
        let sql = 'select * from tbl_nacionalidade order by id desc;'

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdNacionalidade = async function (id) {

    try {
        let sql = `select * from tbl_nacionalidade where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_nacionalidade where id = ${id};`

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
    insertNacionalidade,
    updateNacionalidade,
    selectAllNacionalidade,
    selectByIdNacionalidade,
    deleteNacionalidade
}