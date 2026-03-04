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

const formatarListaParImpar = function (textoFinal, calculo) {
    let formatoTexto = textoFinal.toUpperCase()
    let retorno = String(calculo)
    let separacao = retorno.split('|')
    let lista = separacao[0]
    let numeroQuant = separacao[1]
    let textoFormatado = `\n${formatoTexto}\n`

    textoFormatado += lista
    textoFormatado += `Quantidade de números que foram encontrados: ${numeroQuant}\n`

    return textoFormatado
}

const formatarTextoParImpar = function (numeroP, numeroI, estiloParImpar) {
    let texPar = String(numeroP)
    let texImpar = String(numeroI)
    let formaDesejada = String(estiloParImpar).toUpperCase()
    let texto = ''

    if (formaDesejada === 'PARES' || formaDesejada === 'PAR') {
        texto += `${texPar}`
    } else if (formaDesejada === 'IMPARES' || formaDesejada === 'ÍMPARES' || formaDesejada === 'IMPAR') {
        texto += `${texImpar}`
    } else if (formaDesejada === 'AMBOS') {
        texto += `${texPar}\n`
        texto += `${texImpar}`
    } else {
        texto += `\nOpção inválida!!!`
    }

    return texto
}

module.exports = {
    validarParImparI,
    validarParImparF,
    validarNumeroMaiorIgual,
    calcularNumPar,
    calcularNumImpar,
    formatarTextoParImpar,
    formatarListaParImpar
}