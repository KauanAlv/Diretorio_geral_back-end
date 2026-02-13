/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos matématicos
 * Autor: Kauan
 * Data: 13/02/2026 - (sexta-feira)
 * Versão 1.0
 *************************************************************************/

//Função para realizar o cálculo da operação
function calcularOperacao(n1, n2, operacao) {
    let valor1 = Number(n1)
    let valor2 = Number(n2)
    let validacao = require("./validacao.js")
    let resultado = validacao.validarNumeros(valor1, valor2)
    let sinal = validacao.validarOperacao(operacao)


    if (sinal == "+") {
        return Number(resultado = n1 + n2)
    } else if (sinal == "-") {
        return resultado = n1 - n2
    } else if (sinal == "*") {
        return resultado = n1 * n2
    } else if (sinal == "/") {
        return resultado = n1 / n2
    } else {
        return false
    }
}

module.exports = {
    calcularOperacao
}