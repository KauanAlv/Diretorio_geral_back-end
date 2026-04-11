/*************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto Whatsapp
 * Autor: Kauan Alves
 * Data: 10/04/2026 - (sexta-feira)
 * Versão: 1.0
 ************************************************************************/

//Import das dependências para criar a API
const express = require('express')
const cors = require('cors')

//Criando um objeto do express para criar a API
const app = express()

//Configurações no cors da API
const corsOptions = {
    origin: ['*'],
    methods: 'GET',
    allowedHeaders: ['Content-type', 'Authorization'],
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import do arquivo de funções
const whatsapp = require('./modulo/funcoes.js')

// ================= ENDPOINTS =================

//Endpoint para listar todos os dados de todos os usuários
app.use('/v1/whatsapp/dados/usuarios', function (request, response) {
    let usuarios = whatsapp.getDadosGerais()
    response.status(200)
    response.json(usuarios)
})

//Endpoint para listar os dados do usuário com base no número do whatsapp
app.use('/v1/whatsapp/dados/usuario/:numero', function (request, response) {
    let numero = request.params.numero
    let usuario = whatsapp.getDadosUsuario(numero)
    if (usuario) {
        response.status(200)
        response.json(usuario)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de whatsapp foi encontrado" })
    }
})

//Endpoint para listar os contatos do usuário
app.use('/v1/whatsapp/dados/contatos/:numero', function (request, response) {
    let numero = request.params.numero
    let contatos = whatsapp.getContatosUsuario(numero)
    if (contatos) {
        response.status(200)
        response.json(contatos)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de whatsapp foi encontrado" })
    }
})

//Endpoint que lista todos os contatos com as conversas de um determinado usuário
app.use('/v1/whatsapp/usuario/:numero/mensagens', function (request, response) {
    let numero = request.params.numero
    let contatos = whatsapp.getMensagemUsuario(numero)
    if (contatos) {
        response.status(200)
        response.json(contatos)
    } else {
        response.status(404)
        response.json({ "message": "Nenhum número de whatsapp foi encontrado" })
    }
})

//Endpoint que lista todas as conversas de um determinado nome de contato, via query ?
app.use('/v1/whatsapp/usuario/:numero/conversas', function (request, response) {
    let numero = request.params.numero
    let nomeContato = request.query.contato

    let dados = whatsapp.getContatoMensagem(numero, nomeContato)
    if (dados) {
        response.status(200)
        response.json(dados)
    } else {
        response.status(404)
        response.json({ "message": "Nenhuma conversa foi encontrada" })
    }
})

// ================= START-API =================

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})