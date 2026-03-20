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
    let estadoDaSigla

    for (estadoDaSigla of ESTADOS) {
        if (estadoDaSigla.sigla == sigla) {
            return {
                "uf": estadoDaSigla.sigla,
                "descricao": estadoDaSigla.nome,
                "capital": estadoDaSigla.capital,
                "regiao": estadoDaSigla.regiao
            }
        }
    }

    //Se não haver nada ou algo diferente das siglas corretas, vai retornar false
    return false
}

const getCapitalEstado = function (siglaEscolhida) {
    let sigla = siglaEscolhida.toUpperCase() //Cria a variável da sigla escolhida, transformando em maiúsculo
    let estadoDaSigla

    for (estadoDaSigla of ESTADOS) {
        if (estadoDaSigla.sigla == sigla) {
            return {
                "uf": estadoDaSigla.sigla,
                "descricao": estadoDaSigla.nome,
                "capital": estadoDaSigla.capital
            }
        }
    }

    //Se não haver nada ou algo diferente das siglas corretas, vai retornar false
    return false
}

const getEstadosRegiao = function (regiaoEscolhida) {
    let regEsc = regiaoEscolhida.toUpperCase()
    let listaEstados = {
        "regiao": regEsc,
        "estados": []
    }
    let regioes

    for (regioes of ESTADOS) {
        if (regioes.regiao.toUpperCase() == regEsc) {
            listaEstados.estados.push({
                "uf": regioes.sigla,
                "descricao": regioes.nome
            })
        }
    }

    if (listaEstados.estados.length == 0)
        return false

    return listaEstados
}

const getCapitalPais = function () {
    let listaCapitais = {
        "capitais": []
    }

    ESTADOS.forEach(function (todasCapitais) {
        if (todasCapitais.capital_pais) {
            listaCapitais.capitais.push({
                "capital_atual": todasCapitais.capital_pais.capital,
                "uf": todasCapitais.sigla,
                "descricao": todasCapitais.nome,
                "capital": todasCapitais.capital,
                "regiao": todasCapitais.regiao,
                "capital_pais_ano_inicio": todasCapitais.capital_pais.ano_inicio,
                "capital_pais_ano_termino": todasCapitais.capital_pais.ano_fim
            })
        }
    })

    return listaCapitais
}

const getCidades = function (siglaEscolhida) {
    let siglaEst = String(siglaEscolhida).toUpperCase()
    let listaCidades = {
        "uf": siglaEst,
        "descricao": false,
        "quantidade_cidades": false,
        "cidades": []
    }

    for (let estado of ESTADOS) {
        if (estado.sigla.toUpperCase() == siglaEst) {
            estado.cidades.forEach(function (todasCidades) {
                listaCidades.cidades.push(todasCidades.nome)
            })
            listaCidades.descricao = estado.nome
            listaCidades.quantidade_cidades = estado.cidades.length
        }
    }

    if (listaCidades.cidades.length == 0)
        return false

    return listaCidades
}

console.log(getListaDeEstados())
console.log(getDadosEstado('SP'))
console.log(getCapitalEstado('AC'))
console.log(getEstadosRegiao('Sul'))
console.log(getCapitalPais())
console.log(getCidades('AC'))