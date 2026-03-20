/*********************************************************************************************************************
 * Objetivo: Arquivo responsável por conter todas as funções que faz a busca de Estados, Cidades e Capitais do Brasil
 * Autor: Kauan
 * Data: 18/03/2026 - (quarta-feira)
 * Versão 1.0
*********************************************************************************************************************/

let dados = require('./estados_cidades.js')

const ESTADOS = dados.listaDeEstados.estados

const getListaDeEstados = function () {
    let uf = []     //Cria um novo array
    let quantidade  //Para contar a quantidade de estados
    let listagem    //Para listar os estados com a quantidade

    //Faz a busca de todos os estados na API
    ESTADOS.forEach(function (itemEstado) {

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


const getDadosEstado = function (siglaEscolhida) {
    let sigla = siglaEscolhida.toUpperCase() //Cria a variável da sigla escolhida, transformando em maiúsculo

    for (let estadoDaSigla of ESTADOS) {
        if (estadoDaSigla.sigla == sigla) {
            return {
                uf: estadoDaSigla.sigla,
                descricao: estadoDaSigla.nome,
                capital: estadoDaSigla.capital,
                regiao: estadoDaSigla.regiao
            }
        }
    }

    //Se não haver nada ou algo diferente das siglas corretas, vai retornar false
    return false
}

console.log(getListaDeEstados())
console.log(getDadosEstado('SP'))