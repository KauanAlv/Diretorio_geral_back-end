/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Diretor e Atividade no Banco de Dados MySQL.
 * Data: 05/06/2026 - (sexta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
**********************************************************************************************************************/

//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertDiretorAtividade = async function (diretorAtividade) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_diretor_atividade (
        id_diretor,
        id_atividade
        ) values (
         ${diretorAtividade.id_diretor},
         ${diretorAtividade.id_atividade}
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

const updateDiretorAtividade = async function (diretorAtividade) {
    try {
        let sql =
            `update tbl_diretor_atividade set
                id_diretor  = ${diretorAtividade.id_diretor},
                id_atividade = ${diretorAtividade.id_atividade}
            where id = ${diretorAtividade.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretorAtividade = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_diretor_atividade order by id desc;'

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

const selectByIdDiretorAtividade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_atividade where id = ${id};`

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

const selectAtividadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = ` select tbl_atividade.*

                    from tbl_diretor
                        inner join tbl_diretor_atividade
                            on tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_diretor_atividade.id_atividade
                            
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

const selectDiretoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = ` select tbl_diretor.*

                    from tbl_diretor
                        inner join tbl_diretor_atividade
                            on tbl_diretor.id = tbl_diretor_atividade.id_diretor
                        inner join tbl_atividade
                            on tbl_atividade.id = tbl_diretor_atividade.id_atividade

                    where tbl_atividade.id = ${idAtividade};`

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

const deleteDiretorAtividade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_atividade where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as atividades relacionados com um diretor
//Obs: Esta função será utilizada no put do diretor (apaga a atividade de acordo com o id do diretor)
const deleteAtividadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_atividade where id_diretor = ${idDiretor};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os diretores relacionados com uma atividade
//Obs: Esta função será utilizada no put da atividade (apaga o diretor de acordo com o id da atividade)
const deleteDiretoresByIdAtividade = async function (idAtividade) {
    try {
        let sql = `delete from tbl_diretor_atividade where id_atividade = ${idAtividade};`

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
    insertDiretorAtividade,
    updateDiretorAtividade,
    selectAllDiretorAtividade,
    selectByIdDiretorAtividade,
    selectAtividadesByIdDiretor,
    selectDiretoresByIdAtividade,
    deleteDiretorAtividade,
    deleteAtividadesByIdDiretor,
    deleteDiretoresByIdAtividade
}