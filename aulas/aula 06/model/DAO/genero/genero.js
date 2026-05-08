/***********************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Gênero do filme no Banco de Dados MySQL.
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

const insertGenero = async function (genero) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_genero (
        genero
        ) values (
         replace("${genero.genero}", "'", "")
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

const updateGenero = async function (genero) {
    try {
        let sql =
            `update tbl_genero set
                genero = replace("${genero.genero}", "'", "")
            where id = ${genero.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllGenero = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_genero order by id desc;'

        //Executa no banco de dados o script e guarda o retorno do banco,
        //Pode ser um ERRO (false) ou um Array (de acordo com o Knex) com os dados.
        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0] //Retorna somente o indice com a lista de gêneros
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function (id) {
    try {
        let sql = `select * from tbl_genero where id = ${id}`

        let result = await knexConection.raw(sql)

        //Validação para verificar se o retorno do Banco de Dados é um Array ou um Boolean (false)
        if (Array.isArray(result)) {
            return result[0] //Retorna somente o indice da lista de gêneros
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deleteGenero = async function (id) {
    try {
        let sql = `delete from tbl_genero where id = ${id};`

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
}