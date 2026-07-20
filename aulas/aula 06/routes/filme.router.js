const express = require('express')        //Import do express
const bodyParser = require('body-parser') //Import do bodyParser

const bodyParserJSON = bodyParser.json()  //Permitindo a utilização do JSON no body das requisições

const router = express.Router()           //Cria um objeto de rota para os Endpoints de filme

const controllerFilme = require('../controller/filme/controller_filme.js') //Import da controller do filme

// ================= ENDPOINTS ====================
router.post('/', bodyParserJSON, async function (request, response) {

    //Recebendo o body da requisição
    let dados = request.body

    //Recebendo o tipo de dados da requisição, para validar se é um JSON
    let contentType = request.headers['content-type']

    //Chama a função de inserir e encaminha os dados do filme e o contentType
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {

    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {

    //Recebe o id do filme via parâmetro
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJSON, async function (request, response) {

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

router.delete('/:id', async function (request, response) {

    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)
    response.status(result.status_code)
    response.json(result)
})

//Export do objeto de rotas do filme
module.exports = router