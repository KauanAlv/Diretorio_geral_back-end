/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Filme e Ator no Banco de Dados MySQL.
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

//Função para inserir dados na tabela de Filme Ator
const insertFilmeAtor = async function (filmeAtor) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_filme_ator (
        id_filme,
        id_ator
        ) values (
         ${filmeAtor.id_filme},
         ${filmeAtor.id_ator}
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

//Função para atualizar um Filme Ator existente na tabela
const updateFilmeAtor = async function (filmeAtor) {
    try {
        let sql =
            `update tbl_filme_ator set
                id_filme  = ${filmeAtor.id_filme},
                id_ator = ${filmeAtor.id_ator}
            where id = ${filmeAtor.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retonar os dados da tabela de Filme Ator
const selectAllFilmeAtor = async function () {

    try {
        //Script SQL para listar todos os atores
        let sql = 'select * from tbl_filme_ator order by id desc;'

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

//Função para retonar os dados da tabela de Filme Ator filtrando pelo ID
const selectByIdFilmeAtor = async function (id) {
    try {
        let sql = `select * from tbl_filme_ator where id = ${id};`

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

//Função para retonar os dados da tabela do Ator filtrando pelo ID do Filme
const selectAtoresByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_ator.*

                    from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.id = tbl_filme_ator.id_filme
                        inner join tbl_ator
                            on tbl_ator.id = tbl_filme_ator.id_ator
                            
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

//Função para retonar os dados da tabela do Filme filtrando pelo ID do Ator
const selectFilmesByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_filme.*

                    from tbl_filme
                        inner join tbl_filme_ator
                            on tbl_filme.id = tbl_filme_ator.id_filme
                        inner join tbl_ator
                            on tbl_ator.id = tbl_filme_ator.id_ator

                    where tbl_ator.id = ${idAtor};`

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

//Função para excluir um Filme Ator filtrando pelo ID
const deleteFilmeAtor = async function (id) {
    try {
        let sql = `delete from tbl_filme_ator where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os atores relacionados com um filme
//Obs: Esta função será utilizada no put do filme (apaga o ator de acordo com o id do filme)
const deleteAtoresByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_ator where id_filme = ${idFilme};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os filmes relacionados com um ator
//Obs: Esta função será utilizada no put do ator (apaga o filme de acordo com o id do ator)
const deleteFilmesByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_filme_ator where id_ator = ${idAtor};`

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
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    deleteFilmeAtor,
    selectAtoresByIdFilme,
    selectFilmesByIdAtor,
    deleteAtoresByIdFilme,
    deleteFilmesByIdAtor
}