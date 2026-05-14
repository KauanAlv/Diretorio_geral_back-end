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
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerFoto = require('./controller/foto/controller_foto.js')
const controllerAtividade = require('./controller/atividade/controller_atividade.js')
const controllerSexo = require('./controller/sexo/controller_sexo.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')

// ================= ENDPOINTS =================
// ================= FILME =====================
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']

    //Chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme', async function (request, response) {

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/filme/:id', async function (request, response) {

    //Recebe o id do filme via parâmetro
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição, para validar se é JSON
    let contentType = request.headers['content-type']

    //Recebe o ID do registro a ser atualizado
    let id = request.params.id

    //Recebe os dados do body, que serão modificados no Banco de Dados
    let dados = request.body

    //Chama a função para atualizar o filme, devemos encaminhar as 3 variáveis na mesma sequência
    //que a função foi criada na Controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= GENERO ====================
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero', async function (request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/genero/:id', async function (request, response) {

    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function (request, response) {

    //Recebe o ID do registro a ser atualizado
    let contentType = request.headers['content-type']

    //Recebe o ID do registro a ser atualizado
    let id = request.params.id

    //Recebe os dados do body, que serão modificados no Banco de Dados
    let dados = request.body

    //Chama a função para atualizar o gênero, devemos encaminhar as 3 variáveis na mesma sequência
    //que a função foi criada na Controller
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/genero/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= NACIONALIDADE ====================
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function (request, response) {

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade', async function (request, response) {

    let result = await controllerNacionalidade.listarNacionalidade()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {

    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function (request, response) {

    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/nacionalidade/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerNacionalidade.excluirNacionalidade(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= FOTO ====================
app.post('/v1/senai/locadora/foto', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerFoto.inserirNovaFoto(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/foto', async function (request, response) {

    let result = await controllerFoto.listarFoto()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/foto/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerFoto.buscarFoto(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/foto/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']

    let result = await controllerFoto.atualizarFoto(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/foto/:id', async function (request, response) {
    let id = request.params.id
    
    let result = await controllerFoto.excluirFoto(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= ATIVIDADE ====================
app.post('/v1/senai/locadora/atividade', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividade', async function (request, response) {
    
    let result = await controllerAtividade.listarAtividade()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/atividade/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtividade.buscarAtividade(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/atividade/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']
    
    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/atividade/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtividade.excluirAtividade(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= SEXO ====================
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo', async function (request, response) {
    
    let result = await controllerSexo.listarSexo()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/sexo/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerSexo.buscarSexo(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/sexo/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']
    
    let result = await controllerSexo.atualizarSexo(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/sexo/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerSexo.excluirSexo(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= CLASSIFICAÇÃO =====================
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao', async function (request, response) {
    
    let result = await controllerClassificacao.listarClassificacao()
    response.status(result.status_code)
    response.json(result)
})

app.get('/v1/senai/locadora/classificacao/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']
    
    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/classificacao/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)
    response.status(result.status_code)
    response.json(result)
})

// ================= START-API =================
//Fazer o Start na API (aguardando as requisições)
app.listen(8080, function () {
    console.log('API aguardando novas requisições...')
})