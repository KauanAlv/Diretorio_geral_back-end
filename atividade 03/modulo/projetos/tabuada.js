/*************************************************************************
 * Objetivo: Arquivo responsável por realizar o cálculo da tabuada
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require('../calculo.js')

const validarEntradaTabuada = function (valorEntre) {
    let entrada = Number(valorEntre)

    if (entrada >= 2 && entrada <= 100) {
        return true
    } else {
        return false
    }
}

const validarContadorTabuada = function (valorAte) {
    let contador = Number(valorAte)

    if (contador >= 1 && contador <= 50) {
        return true
    } else {
        return false
    }
}

const calcularTabuada = function (valorInicial, valorFinal, contadorInicial, contadorFinal) {
    let valorTabI = Number(valorInicial)
    let valorTabF = Number(valorFinal)
    let contI = Number(contadorInicial)
    let contF = Number(contadorFinal)
    let resultado = ''

    for (let contador1 = valorTabI; contador1 <= valorTabF; contador1++) {
        resultado += `\nTabuada do ${contador1}\n`

        for (let valor1 = contI; valor1 <= contF; valor1++) {
            resultado += `${contador1} x ${valor1} = ${calculosMatematicos.multiplicar(contador1, valor1)}\n`
        }
    }
    return resultado
}

module.exports = {
    validarEntradaTabuada,
    validarContadorTabuada,
    calcularTabuada
}
