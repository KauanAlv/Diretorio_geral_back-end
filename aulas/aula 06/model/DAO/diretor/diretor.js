/***************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Diretor no Banco de Dados MySQL.
 * Data: 20/05/2026 - (quarta-feira)
 * Autor: Kauan Alves Pereira
 * Versão 1.0
***************************************************************************************/


//Import da biblioteca para manipular dados no Banco de dados MySQL
const knex = require('knex')

//Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js')

//Cria a conexão com o Banco de dados MySQL conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertDiretor = async function (diretor) {
    try {
        let sql = `insert into tbl_diretor (
        nome,
        data_nascimento,
        inicio_carreira,
        id_sexo
        ) values (
         replace ("${diretor.nome}", "'", ""),
         replace ("${diretor.data_nascimento}", "'" ""),
         ${diretor.inicio_carreira},
         ${diretor.id_sexo} 
         );`

         console.log(sql)
         
        let result = await knexConection.raw(sql)
        console.log(result)
        
        if (result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}

const updateDiretor = async function (diretor) {
    try {
        let sql = 
        `update tbl_diretor set
            nome            = replace ("${diretor.nome}", "'", ""),
            data_nascimento = replace ("${diretor.data_nascimento}", "'", "")
            inicio_carreira = ${diretor.inicio_carreira},
            id_sexo         = ${diretor.id_sexo}
        where id = ${diretor.id};`

        let result = await knexConection.raw(sql)

        if (result)
            return true
        else 
            return false

    } catch (error) {
        return false
    }
}

const selectAllDiretor = async function () {
    try {
        let sql = 'select * from tbl_diretor order by id desc;'

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const selectByIdDiretor = async function (id) {
    try {
        let sql = `select from * tbl_diretor where id = ${id};`

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const deleteDiretor = async function (id) {
    try {
    let sql = `delete from tbl_diretor where id = ${id};`

    let result = await knexConection.raw(sql)

    if(result)
        return true
    else
        return false
    
    } catch (error) {
        return false
    }
}

module.exports = {
    insertDiretor,
    updateDiretor,
    selectAllDiretor,
    selectByIdDiretor,
    deleteDiretor
}