//Import das dependências para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Permitindo a utilização do JSON no body das requisições
const bodyParserJSON = bodyParser.json()

//Criando um objeto do express para criar a API
const app = express()

//Configurações no cors da API
const corsOptions = {
    origin: ['*'],   //Configuração de origem da requisição (IP ou Dominío)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //Configuração dos verbos que serão ultilizados na API
    allowedHeaders: ['Content-type', 'Authorization'], //Configurações de permissões
    //                    └── Tipo de dados    └── Autorização de acesso
}

//Aplica as configurações do CORS no app (EXPRESS)
app.use(cors(corsOptions))

//Import das controllers do projeto




const controllerAtor = require('./controller/ator/controller_ator.js')

// ================= ENDPOINTS =================

// ================= FILME =====================
const filmeRouter = require('./routes/filme.router.js')
app.use('/v1/senai/locadora/filme', cors(), filmeRouter)

// ================= GENERO =====================
const generoRouter = require('./routes/genero.router.js')
app.use('/v1/senai/locadora/genero', cors(), generoRouter)

// ================= NACIONALIDADE ====================
const nacionalidadeRouter = require('./routes/nacionalidade.router.js')
app.use('/v1/senai/locadora/nacionalidade', cors(), nacionalidadeRouter)

// ================= FOTO ====================
const fotoRouter = require('./routes/foto.router.js')
app.use('/v1/senai/locadora/foto', cors(), fotoRouter)

// ================= ATIVIDADE ====================
const atividadeRouter = require('./routes/atividade.router.js')
app.use('/v1/senai/locadora/atividade', cors(), atividadeRouter)

// ================= SEXO ====================
const sexoRouter = require('./routes/sexo.router.js')
app.use('/v1/senai/locadora/sexo', cors(), sexoRouter)

// ================= CLASSIFICAÇÃO =====================
const classificacaoRouter = require('./routes/classificacao.router.js')
app.use('/v1/senai/locadora/classificacao', cors(), classificacaoRouter)


// ================= DIRETOR =====================
const diretorRouter = require('./routes/diretor.router.js')
app.use('/v1/senai/locadora/diretor', cors(), diretorRouter)



// ================= ATOR =====================
app.post('/v1/senai/locadora/ator', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtor.inserirNovoAtor(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/ator', async function (request, response) {

    let result = await controllerAtor.listarAtor()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/ator/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtor.buscarAtor(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/ator/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']

    let result = await controllerAtor.AtualizarAtor(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/ator/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtor.excluirAtor(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= START-API =================
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})