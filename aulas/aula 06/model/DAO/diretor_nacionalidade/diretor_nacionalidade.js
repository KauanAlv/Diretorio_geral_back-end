/**********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados na tabela de relação entre Diretor e Nacionalidade no Banco de Dados MySQL.
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


const insertDiretorNacionalidade = async function (diretorFoto) {
    try {

        //Script SQL para inserção no Banco de Dados
        let sql = `insert into tbl_diretor_nacionalidade (
        id_diretor,
        id_nacionalidade
        ) values (
         ${diretorFoto.id_diretor},
         ${diretorFoto.id_nacionalidade}
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

const updateDiretorNacionalidade = async function (diretorFoto) {
    try {
        let sql =
            `update tbl_diretor_nacionalidade set
                id_diretor  = ${diretorFoto.id_diretor},
                id_nacionalidade = ${diretorFoto.id_nacionalidade}
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

const selectAllDiretorNacionalidade = async function () {

    try {
        //Script SQL para listar todos os gêneros
        let sql = 'select * from tbl_diretor_nacionalidade order by id desc;'

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

const selectByIdDiretorNacionalidade = async function (id) {
    try {
        let sql = `select * from tbl_diretor_nacionalidade where id = ${id};`

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

const selectNacionalidadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = ` select tbl_nacionalidade.*

                    from tbl_diretor
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
                            
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

const selectDiretoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = ` select tbl_diretor.*

                    from tbl_diretor
                        inner join tbl_diretor_nacionalidade
                            on tbl_diretor.id = tbl_diretor_nacionalidade.id_diretor
                        inner join tbl_nacionalidade
                            on tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade

                    where tbl_nacionalidade.id = ${idNacionalidade};`

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

const deleteDiretorNacionalidade = async function (id) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id = ${id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir as nacionalidades relacionados com um diretor
//Obs: Esta função será utilizada no put do diretor (apaga a nacionalidade de acordo com o id do diretor)
const deleteNacionalidadesByIdDiretor = async function (idDiretor) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id_diretor = ${idDiretor};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Função para excluir os diretores relacionados com uma nacionalidade
//Obs: Esta função será utilizada no put da nacionalidade (apaga o diretor de acordo com o id da nacionalidades)
const deleteDiretoresByIdNacionalidade = async function (idNacionalidade) {
    try {
        let sql = `delete from tbl_diretor_nacionalidade where id_nacionalidade = ${idNacionalidade};`

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
    insertDiretorNacionalidade,
    updateDiretorNacionalidade,
    selectAllDiretorNacionalidade,
    selectByIdDiretorNacionalidade,
    selectNacionalidadesByIdDiretor,
    selectDiretoresByIdNacionalidade,
    deleteDiretorNacionalidade,
    deleteNacionalidadesByIdDiretor,
    deleteDiretoresByIdNacionalidade
}