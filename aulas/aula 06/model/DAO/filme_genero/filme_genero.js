/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Filme e Gênero no Banco de Dados MySQL.
 * Data: 22/05/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
**********************************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir dados na tabela de Filme Genero
const insertFilmeGenero = async function (filmeGenero) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_filme_genero (
        id_filme,
        id_genero
        ) values (
         ${filmeGenero.id_filme},
         ${filmeGenero.id_genero}
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

//Função para atualizar um Filme Genero existente na tabela
const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql =
            `update tbl_filme_genero set
                id_filme  = ${filmeGenero.id_filme},
                id_genero = ${filmeGenero.id_genero}
            where id = ${filmeGenero.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retonar os dados da tabela de Filme Genero
const selectAllFilmeGenero = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_filme_genero order by id desc;'

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

//Função para retonar os dados da tabela de Filme Genero filtrando pelo ID
const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = `select * from tbl_filme_genero where id = ${id};`

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

//Função para retonar os dados da tabela do Genero filtrando pelo ID do Filme
const selectGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_genero.*

                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                            
                    where tbl_filme.id = ${idFilme};`

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

//Função para retonar os dados da tabela do Filme filtrando pelo ID do Genero
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = ` select tbl_filme.*

                    from tbl_filme
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero

                    where tbl_genero.id = ${idGenero};`

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

//Função para excluir um Filme Genero filtrando pelo ID
const deleteFilmeGenero = async function (id) {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os gêneros relacionados com um filme
//Obs: Esta função será utilizada no put do filme (apaga o genero de acordo com o id do filme)
const deleteGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_genero where id_filme = ${idFilme};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteGenerosByIdFilme
}