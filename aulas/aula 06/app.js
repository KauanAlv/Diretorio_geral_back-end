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
const controllerFilme = require('./controller/filme/controller_filme.js')
// ================= ENDPOINTS =================
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response){

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']
    
    //Chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

// ================= START-API =================
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})