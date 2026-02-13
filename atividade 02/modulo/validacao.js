/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos matématicos
 * Autor: Kauan
 * Data: 13/02/2026 - (sexta-feira)
 * Versão 1.0
 *************************************************************************/

//Função para validar apenas a entrada de números
function validarNumeros(primeiroNumero, segundoNumero) {
    let n1 = Number(primeiroNumero)
    let n2 = Number(segundoNumero)

    if (primeiroNumero == "" || isNaN(primeiroNumero) ||
        segundoNumero == "" || isNaN(segundoNumero)) {
        return false
    } else {
        return Number(n1.toFixed(2)) && Number(n2.toFixed(2))
    }
}

//Função para mostrar a operação que foi escolhida
function definirOperacao(operacaoEscolhida) {
    let opcao = operacaoEscolhida
    let operacao

    if (opcao == "Adição" || opcao == "adição" || opcao == "+" || opcao == "MAIS" || opcao == "mais" || opcao == "Mais" || opcao == "SOMA" || opcao == "soma" || opcao == "Soma") {
        operacao = "+"
        return operacao
    } else if (opcao == "Subtração" || opcao == "subtração" || opcao == "-" || opcao == "MENOS" || opcao == "menos" || opcao == "Menos") {
        operacao = "-"
        return operacao
    } else if (opcao == "Multiplicação" || opcao == "multiplicação" || opcao == "*" || opcao == "VEZES" || opcao == "vezes" || opcao == "Vezes") {
        operacao = "*"
        return operacao
    } else if (opcao == "Divisão" || opcao == "divisão" || opcao == "/" || opcao == "DIVIDE" || opcao == "divide" || opcao == "Divide") {
        operacao = "/"
        return operacao
    } else {
        return false
    }
}

//Função que valida se a operação escolhida está correta ou não
function validarOperacao(operacaoValidada) {
    let operacao = operacaoValidada

    if (operacao == "" || isNaN(operacao)) {
        let retorno = definirOperacao(operacao)
        return retorno
    } else {
        return false
    }
}

module.exports = {
    validarNumeros,
    definirOperacao,
    validarOperacao
}