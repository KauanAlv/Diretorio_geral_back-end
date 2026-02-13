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

let moduloValidacao = require("./modulo/validacao.js")
let moduloCalculo = require("./modulo/calculo.js")

entradaDeDados.question("Digite o primeiro número: ", function (numero1) {
    let primeiroNumero = Number(numero1.replace(/\./g, '').replace(',', '.'))

    entradaDeDados.question("Digite o segundo número: ", function (numero2) {
        let segundoNumero = Number(numero2.replace(/\./g, '').replace(',', '.'))

        entradaDeDados.question("Qual operação vai utilizar?\n[+] Adição\n[-] Subtração\n[*] Multiplicação\n[/] Divisão\nDigite apenas uma: ", function (operacao) {
            let operacaoEscolhida = operacao
            let operacaoValidada = moduloValidacao.validarOperacao(moduloValidacao.definirOperacao(operacaoEscolhida))

            if (operacaoValidada) {
                let calculoFinal = moduloCalculo.calcularOperacao(primeiroNumero, segundoNumero, operacaoEscolhida)

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

    })//Fecha o numero 2
})//Fecha o numero 1