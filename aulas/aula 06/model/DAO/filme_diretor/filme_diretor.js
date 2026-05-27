/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Filme e Diretor no Banco de Dados MySQL.
 * Data: 27/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
**********************************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir dados na tabela de Filme Diretor
const insertFilmeDiretor = async function (filmeDiretor) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_filme_diretor (
        id_filme,
        id_diretor
        ) values (
         ${filmeDiretor.id_filme},
         ${filmeDiretor.id_diretor}
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

//Função para atualizar um Filme Diretor existente na tabela
const updateFilmeDiretor = async function (filmeDiretor) {
    try {
        let sql =
            `update tbl_filme_diretor set
                id_filme  = ${filmeDiretor.id_filme},
                id_diretor = ${filmeDiretor.id_diretor}
            where id = ${filmeDiretor.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Função para retonar os dados da tabela de Filme Diretor
const selectAllFilmeDiretor = async function () {

    try {
        //Script SQL para listar todos os diretores
        let sql = 'select * from tbl_filme_diretor order by id desc;'

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

//Função para retonar os dados da tabela de Filme Diretor filtrando pelo ID
const selectByIdFilmeDiretor = async function (id) {
    try {
        let sql = `select * from tbl_filme_diretor where id = ${id};`

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

//Função para retonar os dados da tabela do Diretor filtrando pelo ID do Filme
const selectDiretoresByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_diretor.*

                    from tbl_filme
                        inner join tbl_filme_diretor
                            on tbl_filme.id = tbl_filme_diretor.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id = tbl_filme_diretor.id_diretor
                            
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

//Função para retonar os dados da tabela do Filme filtrando pelo ID do Diretor
const selectFilmesByIdDiretor = async function (idDiretor) {
    try {
        let sql = ` select tbl_diretor.*

                    from tbl_filme
                        inner join tbl_filme_diretor
                            on tbl_filme.id = tbl_filme_diretor.id_filme
                        inner join tbl_diretor
                            on tbl_diretor.id = tbl_filme_diretor.id_diretor

                    where tbl_diretor.id = ${idDiretor};`

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

//Função para excluir um Filme Diretor filtrando pelo ID
const deleteFilmeDiretor = async function (id) {
    try {
        let sql = `delete from tbl_filme_diretor where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os diretores relacionados com um filme
//Obs: Esta função será utilizada no put do filme (apaga o diretor de acordo com o id do filme)
const deleteDiretoresByIdFilme = async function (idFilme) {
    try {
        let sql = `delete from tbl_filme_diretor where id_filme = ${idFilme};`

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
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    deleteFilmeDiretor,
    selectDiretoresByIdFilme,
    selectFilmesByIdDiretor,
    deleteDiretoresByIdFilme
}