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
app.get('/v1/whatsapp/dados/usuarios', function (request, response) {
    let usuarios = whatsapp.getDadosGerais()
    response.status(200)
    response.json(usuarios)
})

//Endpoint para listar os dados do usuário com base no número do whatsapp
app.get('/v1/whatsapp/dados/usuario/:numero', function (request, response) {
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
app.get('/v1/whatsapp/dados/contatos/:numero', function (request, response) {
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
app.get('/v1/whatsapp/usuario/:numero/mensagens', function (request, response) {
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
app.get('/v1/whatsapp/usuario/:numero/conversas', function (request, response) {
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

//Endpoint que filtra uma palavra específica de uma conversa do usuário com um contato
app.get('/v1/whatsapp/usuarios/:numero/conversas/filtro', function (request, response) {
    let numero = request.params.numero
    let nomeContato = request.query.contato
    let palavra = request.query.palavra

    if (!nomeContato || !palavra) {
        response.status(400)
        response.json({ "message": "Parâmetros 'contato' e 'palavra' são obrigatórios" })
    }

    let dados = whatsapp.getContatoMensagem(numero, nomeContato)
    let mensagensFiltradas = dados && whatsapp.filtrarMensagem(dados.mensagens, palavra)

    if (!dados) {
        response.status(404)
        response.json({ "message": "Nenhuma conversa foi encontrada" })
    } else if (!mensagensFiltradas) {
        response.status(404)
        response.json({ "message": "Nenhuma mensagem foi encontrada com essa palavra" })
    } else {
        response.status(200)
        response.json({
            usuario: dados.usuario,
            contato: dados.contato,
            numero: dados.numero,
            mensagens: mensagensFiltradas
        })
    }
})

// ================= START-API =================

//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})