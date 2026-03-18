/*********************************************************************************************************************
 * Objetivo: Arquivo responsável por conter todas as funções que faz a busca de Estados, Cidades e Capitais do Brasil
 * Autor: Kauan
 * Data: 18/03/2026 - (quarta-feira)
 * Versão 1.0
*********************************************************************************************************************/

let dados = require('./estados_cidades.js')

const getListaDeEstados = function () {
    let uf = []     //Cria um novo array
    let quantidade  //Para contar a quantidade de estados
    let listagem    //Para listar os estados com a quantidade

    //Faz a busca de todos os estados na API
    dados.listaDeEstados.estados.forEach(function (itemEstado) {

        //No novo array, adiciona a sigla de todos os estados já existentes
        uf.push(itemEstado.sigla)
    })

    //Com todos os estados no novo array, conta a quantidade
    quantidade = uf.length

    //Joga os estados e a quantidade dentro de um JSON,
        //para os estados ficarem em um ARRAY e a quantidade fora desse ARRAY
    listagem = { uf, quantidade }

    return listagem
}

getListaDeEstados()