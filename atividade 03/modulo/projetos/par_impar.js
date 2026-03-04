/**************************************************************************************
 * Objetivo: Arquivo responsável por realizar o separamento de número pares e impares
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 **************************************************************************************/

const validarParImparI = function (numeroParImparI) {
    let numeroInicial = Number(numeroParImparI)

    if (numeroInicial >= 0 && numeroInicial <= 500) {
        return true
    } else {
        return false
    }
}

const validarParImparF = function (numeroParImparF) {
    let numeroInicial = Number(numeroParImparF)

    if (numeroInicial >= 100 && numeroInicial <= 1000) {
        return true
    } else {
        return false
    }
}

const validarNumeroMaiorIgual = function (numeroInicial, numeroFinal) {
    let numIni = Number(numeroInicial)
    let numFim = Number(numeroFinal)

    if (numIni >= numFim) {
        return false
    } else {
        return true
    }
}

const calcularNumPar = function (numeroInicio, numeroFim) {
    let numI = Number(numeroInicio)
    let numF = Number(numeroFim)
    let resultado = ''
    let contagem = 0

    for (let numCont = numI; numCont <= numF; numCont++) {
        if (numCont % 2 === 0) {
            resultado += numCont + '\n'
            contagem++
        }
    }

    return resultado + '|' + contagem
}

const calcularNumImpar = function (numeroInicio, numeroFim) {
    let numI = Number(numeroInicio)
    let numF = Number(numeroFim)
    let resultado = ''
    let contagem = 0

    for (let numCont = numI; numCont <= numF; numCont++) {
        if (numCont % 2 !== 0) {
            resultado += numCont + '\n'
            contagem++
        }
    }

    return resultado + '|' + contagem
}

module.exports = {
    validarParImparI,
    validarParImparF,
    validarNumeroMaiorIgual,
    calcularNumPar,
    calcularNumImpar
}