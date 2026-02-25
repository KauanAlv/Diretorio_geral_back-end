/*********************************************************************************************************************
 * Objetivo: Arquivo responsável por gerar uma tabuada utilizando WHILE E FOR
 * Data: 25/02/2026 - (quarta-feira)
 * Autor: Kauan
 * Versão: 1.0
*********************************************************************************************************************/

const calculosMatematicos = require('./calculo.js')

//Função para imprimir a tabuada
const gerarTabuadaWhile = function (tabuada) {
    let tab = Number(tabuada)
    let cont = 0
    let resultado

    while (cont <= 10) {
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + ' x ' + cont + ' = ' + resultado)

        //cont = cont + 1
        //cont++
        cont += 1
    }
}

const gerarTabuadaFor = function (tabuada) {
    let tab = Number(tabuada)
    let resultado

    for (let cont = 0; cont <= 10; cont++) {
        //Processamento
        resultado = calculosMatematicos.multiplicar(tab, cont)
        console.log(tab + ' x ' + cont + ' = ' + resultado)
    }
}

gerarTabuadaWhile(5)
console.log('')
gerarTabuadaFor(2)