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
const atorRouter = require('./routes/ator.router.js')
app.use('/v1/senai/locadora/ator', cors(), atorRouter)

// ================= START-API =================
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})