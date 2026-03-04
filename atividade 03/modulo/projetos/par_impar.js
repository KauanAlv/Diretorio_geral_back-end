/********************************************************************************************************
 * Objetivo: Arquivo responsável por realizar o separamento de número pares e impares e seus cálculos
 * Autor: Kauan
 * Data: 04/03/2026 - (quarta-feira)
 * Versão 1.0
 ********************************************************************************************************/

//Função para validar se o primeiro número é maior ou igual a 0 ou maior ou igual a 500
const validarParImparI = function (numeroParImparI) {
    let numeroInicial = Number(numeroParImparI)

    if (numeroInicial >= 0 && numeroInicial <= 500) {
        return true
    } else {
        return false
    }
}

//Função para validar se o último número é maior ou igual a 100 ou maior ou igual a 1000
const validarParImparF = function (numeroParImparF) {
    let numeroInicial = Number(numeroParImparF)

    if (numeroInicial >= 100 && numeroInicial <= 1000) {
        return true
    } else {
        return false
    }
}

//Função para validar se o número é maior ou igual
const validarNumeroMaiorIgual = function (numeroInicial, numeroFinal) {
    let numIni = Number(numeroInicial)
    let numFim = Number(numeroFinal)

    if (numIni >= numFim) {
        return false
    } else {
        return true
    }
}

//Função para calcular se o número é par
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

//Função para calcular se o número é impar
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

//Função para formartar o texto da quantidade de números encontrados
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

//Função para formatar se vai ser números pares, números impares ou ambos
const formatarTextoParImpar = function (estiloParImpar, numeroP, numeroI) {
    let formaDesejada = String(estiloParImpar.toUpperCase())
    let texPar = String(numeroP)
    let texImpar = String(numeroI)
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