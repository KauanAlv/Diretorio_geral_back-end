/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Ator e Foto no Banco de Dados MySQL.
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


const insertAtorFoto = async function (atorFoto) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_ator_foto (
        id_ator,
        id_foto
        ) values (
         ${atorFoto.id_ator},
         ${atorFoto.id_foto}
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

const updateAtorFoto = async function (atorFoto) {
    try {
        let sql =
            `update tbl_ator_foto set
                id_ator  = ${atorFoto.id_ator},
                id_foto = ${atorFoto.id_foto}
            where id = ${atorFoto.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllAtorFoto = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_ator_foto order by id desc;'

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

const selectByIdAtorFoto = async function (id) {
    try {
        let sql = `select * from tbl_ator_foto where id = ${id};`

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

const selectFotosByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_foto.*

                    from tbl_ator
                        inner join tbl_ator_foto
                            on tbl_ator.id = tbl_ator_foto.id_ator
                        inner join tbl_foto
                            on tbl_foto.id = tbl_ator_foto.id_foto
                            
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

const deleteAtorFoto = async function (id) {
    try {
        let sql = `delete from tbl_ator_foto where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as fotos relacionados com um Ator
//Obs: Esta função será utilizada no put do Ator (apaga a foto de acordo com o id do Ator)
const deleteFotosByIdAtor = async function (idAtor) {
    try {
        let sql = `delete from tbl_ator_foto where id_Ator = ${idAtor};`

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
    insertAtorFoto,
    updateAtorFoto,
    selectAllAtorFoto,
    selectByIdAtorFoto,
    selectFotosByIdAtor,
    deleteAtorFoto,
    deleteFotosByIdAtor
}