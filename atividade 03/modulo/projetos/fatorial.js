/*************************************************************************
 * Objetivo: Arquivo responsável por realizar o cálculo fatorial
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const validarFatorial = function (valorFatorialE) {
    let valorF = Number(valorFatorial)

    if (valorF <= 0 || valorF == 1) {
        return false
    } else {
        return true
    }
}

const calcularFatorial = function (valorFatorial) {
    let valorFat = 1

    for (let numF = valorFat; numF <= valorFatorial; numF++) {
        valorFat *= numF
    } return valorFat
}

const formatarNumeroFatorial = function (numeroFatorial) {
    let numeroF = Number(numeroFatorial)
    let resultado = ''

    for (let F = numeroF; F >= 1; F--) {
        resultado += F

        if (F > 1) {
            resultado += ' x '
        }
    } return resultado
}

module.exports = {
    validarFatorial,
    calcularFatorial,
    formatarNumeroFatorial
}