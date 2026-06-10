
const express = require('express')        //Import do express
const bodyParser = require('body-parser') //Import do bodyParser

const bodyParserJSON = bodyParser.json()  //Permitindo a utilização do JSON no body das requisições

const router = express.Router()           //Cria um objeto de rota para os Endpoints de atividade

const controllerAtividade = require('./controller/atividade/controller_atividade.js') //Import da controller da atividade

// ================= ENDPOINTS ====================
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerAtividade.inserirNovaAtividade(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {

    let result = await controllerAtividade.listarAtividade()
    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtividade.buscarAtividade(id)
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']

    let result = await controllerAtividade.atualizarAtividade(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerAtividade.excluirAtividade(id)
    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas da atividade
module.exports = router