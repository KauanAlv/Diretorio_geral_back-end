/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos matématicos
 * Autor: Kauan
 * Data: 13/02/2026 - (sexta-feira)
 * Versão 1.0
 *************************************************************************/

const { stdout } = require("process")
const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout

})

entradaDeDados.question("Digite o primeiro número: ", function (numero1) {
    let primeiroNumero = Number(numero1.replace(/\./g, '').replace(',', '.'))

    entradaDeDados.question("Digite o segundo número: ", function (numero2) {
        let segundoNumero = Number(numero2.replace(/\./g, '').replace(',', '.'))

        let validacao = validarNumeros(primeiroNumero, segundoNumero)
       
        if (validacao) {
            entradaDeDados.question("Qual operação vai utilizar?\n[+] Adição\n[-] Subtração\n[*] Multiplicação\n[/] Divisão\nDigite apenas uma: ", function (operacao) {
                let operacaoEscolhida = operacao
                let operacaoValidada = validarOperacao(definirOperacao(operacaoEscolhida))

                if (operacaoValidada) {
                    let calculoFinal = calcularOperacao(primeiroNumero, segundoNumero, operacaoEscolhida)
                    
                    console.log("\n*******************************************")
                    console.log("O primeiro número é: " + primeiroNumero)
                    console.log("O segundo número é: " + segundoNumero)
                    console.log("A operação escolhida foi: " + operacaoValidada)
                    console.log("O resultado final foi: " + calculoFinal)
                    console.log("*******************************************\n")
                } else {
                    console.log("A operação foi definida incorretamente")
                }
            })
        } else {
            console.log("Aconteceu um erro")
        }
    })//Fecha o numero 2
})//Fecha o numero 1


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

//Função para realizar o cálculo da operação
function calcularOperacao(n1, n2, operacao) {
    let valor1 = Number(n1)
    let valor2 = Number(n2)
    let resultado = validarNumeros(valor1, valor2)
    let sinal = validarOperacao(operacao)


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