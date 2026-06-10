
const express = require('express')        //Import do express
const bodyParser = require('body-parser') //Import do bodyParser

const bodyParserJSON = bodyParser.json()  //Permitindo a utilização do JSON no body das requisições

const router = express.Router()           //Cria um objeto de rota para os Endpoints de diretor

const controllerDiretor = require('./controller/diretor/controller_diretor.js') //Import da controller do diretor

// ================= ENDPOINTS ====================
router.post('/', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']

    let result = await controllerDiretor.inserirNovoDiretor(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {

    let result = await controllerDiretor.listarDiretor()
    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerDiretor.buscarDiretor(id)
    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {
    let dados = request.body
    let id = request.params.id
    let contentType = request.headers['content-type']

    let result = await controllerDiretor.AtualizarDiretor(dados, id, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerDiretor.excluirDiretor(id)
    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas do diretor
module.exports = router