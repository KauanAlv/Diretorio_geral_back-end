/***********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados da Classificação no Banco de Dados MySQL.
 * Data: 13/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
***********************************************************************************************/


//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertClassificacao = async function (classificacao) {
    try {
        let sql = ''
        if(classificacao.idade_minima == undefined) {
        sql = `insert into tbl_classificacao (
        classificacao,
        descricao
        ) values (
         replace ("${classificacao.classificacao}", "'", ""),
         if('${classificacao.descricao}' = '', null, replace("${classificacao.descricao}", "'", ""))
        );`

        } else {
        sql = `insert into tbl_classificacao (
        classificacao,
        descricao,
        idade_minima
        ) values (
         replace ("${classificacao.classificacao}", "'", ""),
         if('${classificacao.descricao}' = '', null, replace("${classificacao.descricao}", "'", "")),
         ${classificacao.idade_minima}
         );`
        }
        

        let result = await knexConection.raw(sql)

        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateClassificacao = async function (classificacao) {
    try {
        let sql =
        `update tbl_classificacao set
            classificacao = replace ("${classificacao.classificacao}", "'", ""),
            descricao = if('${classificacao.descricao}' = '', null, replace("${classificacao.descricao}", "'", "")),
            idade_minima = if('${classificacao.idade_minima}' = '', 0, replace ("${classificacao.idade_minima}", "'", ""))
        where id = ${classificacao.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllClassificacao = async function () {
    try {
        let sql = 'select * from tbl_classificacao order by id desc;'

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

const selectByIdClassificacao = async function (id) {
    try {
        let sql = `select * from tbl_classificacao where id = ${id};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function (id) {
    try {
        let sql = `delete from tbl_classificacao where id = ${id};`

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
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}