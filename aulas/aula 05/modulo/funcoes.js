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
    let sigla = String(siglaEscolhida).toUpperCase() //Cria a variável da sigla escolhida, transformando em maiúsculo
    let listaEstado = { //Cria uma variável de um JSON para ser inserido o indice
        "uf": sigla,
        "descricao": false,
        "capital": false,
        "regiao": false
    }

    //Faz um for of para pegar da API a descrição, a capital e a região
    for (let estadoDaSigla of ESTADOS) {
        if (estadoDaSigla.sigla == sigla) {
            listaEstado.descricao = estadoDaSigla.nome
            listaEstado.capital = estadoDaSigla.capital
            listaEstado.regiao = estadoDaSigla.regiao
        }
    }

    //Se algum desses estiverem falso, vai retornar falso
    if (listaEstado.descricao == false || listaEstado.capital == false || listaEstado.regiao == false)
        return false

    return listaEstado
}

const getCapitalEstado = function (siglaEscolhida) {
    let sigla = String(siglaEscolhida).toUpperCase() //Cria a variável da sigla escolhida, transformando em maiúsculo
    let listaCapitalEstado = { //Cria uma variável de um JSON inicial, com a descrição e a capital inicialmente sem valor
        "uf": sigla,
        "descricao": false,
        "capital": false
    }

    //Faz um for of para pegar da API a descrição e a capital
    for (let estadoDaSigla of ESTADOS) {
        if (estadoDaSigla.sigla == sigla) {
            listaCapitalEstado.descricao = estadoDaSigla.nome
            listaCapitalEstado.capital = estadoDaSigla.capital
        }
    }

    //Se algum desses estiverem falso, vai retornar falso
    if (listaCapitalEstado.descricao === false || listaCapitalEstado.capital === false)
        return false

    return listaCapitalEstado
}

const getEstadosRegiao = function (regiaoEscolhida) {
    let regEsc = String(regiaoEscolhida).toUpperCase() //Cria a variável da região escolhida, transformando em maiúsculo
    let listaEstados = { //Cria uma variável de um JSON inicial, com a região definida e o estado com um array vazio
        "regiao": regEsc,
        "estados": []
    }

    //Faz um for of nos estados da região escolhida e adiciona os estados no array que inicialmente estava vazio
    for (let regioes of ESTADOS) {
        if (regioes.regiao.toUpperCase() == regEsc) {
            listaEstados.estados.push({
                "uf": regioes.sigla,
                "descricao": regioes.nome
            })
        }
    }

    //Se o array inicial estiver vazil, vai retornar falso
    if (listaEstados.estados.length === 0)
        return false

    return listaEstados
}

const getCapitalPais = function () {
    let listaCapitais = { //Cria uma variável de um JSON, com um array da capital vazio
        "capitais": []
    }

    //Faz um for each nos estados para procurar os estados que já foram capitais e adiciona no array vazio
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
    let siglaEst = String(siglaEscolhida).toUpperCase() //Cria a variável da sigla escolhida, transformando em maiúsculo
    let listaCidades = { //Cria uma variável de um JSON inicial, com a sigla escolhida, a descrição e a quantidade de cidades sem valor
        //e o atributo chave com um array vazio
        "uf": siglaEst,
        "descricao": false,
        "quantidade_cidades": false,
        "cidades": []
    }

    //Faz um for of dos estados para adicionar a descrição, quantidade de cidades e as cidades de cada estado
    for (let estado of ESTADOS) {
        if (estado.sigla.toUpperCase() == siglaEst) {
            estado.cidades.forEach(function (todasCidades) {
                listaCidades.cidades.push(todasCidades.nome)
            })
            listaCidades.descricao = estado.nome
            listaCidades.quantidade_cidades = estado.cidades.length
        }
    }

    //Se o array das cidades estiver vazio, retorna falso
    if (listaCidades.cidades.length === 0)
        return false

    return listaCidades
}

module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
}