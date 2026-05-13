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

}

const updateClassificacao = async function (classificacao) {
    
}

const selectAllClassificacao = async function () {
    
}

const selectByIdClassificacao = async function (id) {
    
}

const deleteClassificacao = async function (id) {
    
}

module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}