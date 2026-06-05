/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Diretor e Foto no Banco de Dados MySQL.
 * Data: 04/06/2026 - (quinta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
**********************************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertDiretorFoto = async function (diretorFoto) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_diretor_foto (
        id_diretor,
        id_foto
        ) values (
         ${diretorFoto.id_diretor},
         ${diretorFoto.id_foto}
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

const updateDiretorFoto = async function (diretorFoto) {
    try {
        let sql =
            `update tbl_diretor_foto set
                id_diretor  = ${diretorFoto.id_diretor},
                id_foto = ${diretorFoto.id_foto}
            where id = ${diretorFoto.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretorFoto = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_diretor_foto order by id desc;'

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

const selectByIdDiretorFoto = async function (id) {
    try {
        let sql = `select * from tbl_diretor_foto where id = ${id};`

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

const selectFotosByIdDiretor = async function (idDiretor) {
    try {
        let sql = ` select tbl_foto.*

                    from tbl_diretor
                        inner join tbl_diretor_foto
                            on tbl_diretor.id = tbl_diretor_foto.id_diretor
                        inner join tbl_foto
                            on tbl_foto.id = tbl_diretor_foto.id_foto
                            
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

const deleteDiretorFoto = async function (id) {
    try {
        let sql = `delete from tbl_diretor_foto where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as fotos relacionados com um diretor
//Obs: Esta função será utilizada no put do diretor (apaga a foto de acordo com o id do diretor)
const deleteFotosByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_foto where id_diretor = ${idDiretor};`

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
    insertDiretorFoto,
    updateDiretorFoto,
    selectAllDiretorFoto,
    selectByIdDiretorFoto,
    selectFotosByIdDiretor,
    deleteDiretorFoto,
    deleteFotosByIdDiretor
}