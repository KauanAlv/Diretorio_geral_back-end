/*************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da Foto no Banco de Dados MySQL.
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

const insertFoto = async function (foto) {
    try {
        let sql = `insert into tbl_foto (
        foto
        ) values (
         replace ("${foto.foto}", "'", "")
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

const updateFoto = async function (foto) {
    try {
        let sql = 
        `update tbl_foto set
            foto = replace ("${foto.foto}", "'", "")
        where id = ${foto.id};`

        let result = await knexConection.raw(sql)

        if (result) 
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

const selectAllFoto = async function () {
    try {
        let sql = 'select * from tbl_foto order by id desc;'

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

const selectByIdFoto = async function (id) {
    try {
        let sql = `select * from tbl_foto where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteFoto = async function (id) {
    try {
        let sql = `delete from tbl_foto where id = ${id};`

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
    insertFoto,
    updateFoto,
    selectAllFoto,
    selectByIdFoto,
    deleteFoto
}