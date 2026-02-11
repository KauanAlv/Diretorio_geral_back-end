/*************************************************************************
 * Objetivo: Criar uma aplicação que realiza cálculos de juros utilizando
 *  Funções para modularizar o código
 * Autor: Kauan
 * Data: 11/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

//Import da biblioteca do readline
const readline = require("readline")

//Criando o objeto de entrada de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada do nome do cliente
entradaDeDados.question("Digite o nome do Cliente:", function (nome) {
    let nomeCliente = nome

    //Entrada do nome do produto
    entradaDeDados.question("Digite o nome do Produto: ", function (produto) {
        let nomeProduto = produto

        //Entrada do valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function (valor) {
            let valorCompra = valor

            //Entrada da taxa de juros
            entradaDeDados.question("Digite a taxa de juros: ", function (taxa) {
                let taxaJuros = taxa

                //Entrada da qtde de parcelas
                entradaDeDados.question("Digite a quantidade de parcelas: ", function (parcelas) {
                    let qtdeParcelas = parcelas

                    let montante = calcularJurosCompostos(valorCompra, taxaJuros, qtdeParcelas)

                    console.log(montante)

                })
            })
        })
    })
})


//Função para retornar o percentual de um número
function calcularParcentual(numero) {
    //Recebe o numero encaminhado
    let numeroPercentual = Number(numero)

    //Validação de entrada vazia, menor ou igual a 0 e de caracter
    if (numero == "" || numero <= 0 || isNaN(numero)) {
        return false
    } else {
        //Calcula o percentual do número
        let percentual = numeroPercentual / 100
        return Number(percentual.toFixed(2))
    }
}

//Função para retonar o montante referente a juros composto
function calcularJurosCompostos(valor, taxa, parcelas) {
    //Recebe os valores dos argumentos e converte em número
    let valorPrincipal = Number(valor)
    let taxaJuros = Number(taxa)
    let qtdeParcelas = Number(parcelas)

    //Validação de vazio ou de caracteres
    if (valor == "" || isNaN(valor) || valor <= 0 || parcelas <= 0 || parcelas == "" || isNaN(parcelas)) {
        return false
    } else {
        //Chama a função para retornar o percentual da taxa
        let percentual = calcularParcentual(taxaJuros)

        if (percentual) {
            //Calculo
            let montante = valorPrincipal * (1 + percentual) ** qtdeParcelas
            return Number(montante.toFixed(2))
        } else {
            return false
        }
    }
}