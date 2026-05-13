/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de Sexo no Banco de Dados MySQL.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
*************************************************************************************/


//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertSexo = async function (sexo) {
    try {
        let sql = `insert into tbl_sexo (
        sigla,
        sexo
        ) values (
         replace ("${sexo.sigla}", "'", ""),
         replace ("${sexo.sexo}", "'", "")
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

const updateSexo = async function (sexo) {
    try {
        let sql =
        `update tbl_sexo set
            sigla = replace ("${sexo.sigla}", "'", ""),
            sexo = replace ("${sexo.sexo}", "'", "")
        where id = ${sexo.id};`

        let result = await knexConection.raw(sql)

        if (result) 
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

const selectAllSexo = async function () {
    try {
        let sql = 'select * from tbl_sexo order by id desc;'

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

const selectByIdSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexo where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteSexo = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id};`

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
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}