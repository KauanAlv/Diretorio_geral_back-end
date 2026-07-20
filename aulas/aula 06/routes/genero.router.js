const express = require('express')        //Import do express
const bodyParser = require('body-parser') //Import do bodyParser

const bodyParserJSON = bodyParser.json()  //Permitindo a utilização do JSON no body das requisições

const router = express.Router()           //Cria um objeto de rota para os Endpoints de gênero

const controllerGenero = require('../controller/genero/controller_genero.js') //Import da controller do gênero

// ================= ENDPOINTS ====================
router.post('/', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {

    let id = request.params.id
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {

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

router.delete('/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)
    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas do gênero
module.exports = router