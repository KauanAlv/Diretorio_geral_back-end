/**************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Estados e Cidades
 * Autor: Kauan Alves
 * Data: 01/04/2026 - (quarta-feira)
 * Versão: 1.0
 **************************************************************************************/

/*
 * Para configurar a API:
 * Instalar o EXPRESS -> npm install express --save 
 *                                       │      └── Registra o pacote e a versão que foram instaladas
 *                                       └── Dependências para configurar e utilizar o protocolo HTTP, para criar a API                                                                               
 * Instalar o CORS -> npm install cors -- save 
 *                                 └── Dependências para configurar as permissões de acesso a API
 * 
 */


//Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações no cors da API
const corsOptions = {
    origin: ['*'],   //Configuração de origem da requisição (IP ou Dominío)
    methods: 'GET', //Configuração dos verbos que serão ultilizados na API
    allowedHeaders: ['Content-type', 'Authorization'], //Configurações de permissões
    //                    └── Tipo de dados    └── Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const estadosCidades = require('./modulo/funcoes.js')

// ================= ENDPOINTS =================
//Endpoint que lista todos os outros endpoints
app.get('/help', function (request, response) {
    response.json({
        "message": "Aqui estão todas as rotas da API",
        "rotas": [
            "/v1/senai/estados",
            "/v1/senai/dados/estado/:uf",
            "/v1/senai/capital/estado/:uf",
            "/v1/senai/estados/regiao/:regiao",
            "/v1/senai/capital/pais",
            "/v1/senai/cidades/estado/:uf"
        ]
    })
    response.status(200)
})

//Endpoint para listar os estados
app.get('/v1/senai/estados', function (request, response) {
    let estados = estadosCidades.getListaDeEstados()
    response.json(estados)
    response.status(200) //Requisição bem sucedida!!!
})

//Endpoint para listar o estado através da sigla
app.get('/v1/senai/dados/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)
    if (estado) {
        response.json(estado)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado" })
        response.status(404)
    }
})

//Endpoint para listar a capital do estado através da sigla
app.get('/v1/senai/capital/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstado(sigla)
    if (capital) {
        response.json(capital)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado" })
        response.status(404)
    }
})

//Endpoint para listar os estados através da região
app.get('/v1/senai/estados/regiao/:regiao', function (request, response) {
    let regiao = request.params.regiao
    let estados = estadosCidades.getEstadosRegiao(regiao)
    if (estados) {
        response.json(estados)
        response.status(200)
    } else {
        response.json({ "message": "Nenhuma região foi encontrada" })
        response.status(404)
    }
})

//Endpoint para listar os estados que já foram capitais
app.get('/v1/senai/capital/pais', function (request, response) {
    let capitais = estadosCidades.getCapitalPais()
    response.json(capitais)
    response.status(200)
})

//Endpoint para listar as cidades do estado selecionado
app.get('/v1/senai/cidades/estado/:uf', function (request, response) {
    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)
    if (cidades) {
        response.json(cidades)
        response.status(200)
    } else {
        response.json({ "message": "Nenhum estado foi encontrado" })
        response.status(404)
    }
})

// ================= START-API =================
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})
