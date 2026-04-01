/*************************************************************************
 * Objetivo: Arquivo responsável por realizar o cálculo fatorial
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

//Validar se o número fatorial é igual a 1 ou menor ou igual a 0
const validarFatorial = function (valorFatorialE) {
    let valorF = Number(valorFatorialE)

    if (valorF <= 0 || valorF == 1) {
        return false
    } else {
        return true
    }
}

//Realiza o calculo do número fatorial
const calcularFatorial = function (valorFatorial) {
    let valorFat = 1

    for (let numF = valorFat; numF <= valorFatorial; numF++) {
        valorFat *= numF
    } return valorFat
}

//Formata o estilo do número fatorial, para aparecer conforme o exemplo:
// 5! = 5 x 4 x 3 x 2 x 1 = 120
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