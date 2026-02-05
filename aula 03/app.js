/**************************************************************************
 * Objetivo: Projeto para realizar o cálculo do juros compostos de uma
 * empresa especializada na venda de roupas e acessórios
 * Autor: Kauan
 * Data: 04/02/2026 (Quarta-feira)
 * Versão: 1.0
 **************************************************************************/

const readline = require("readline")
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//ENTRADA DE DADOS
entradaDeDados.question("Digite o nome do cliente: ", function (nomeCliente) {
    let nome = nomeCliente

    if (nome == "" || !isNaN(nome)) {
        console.log("ERRO: O CAMPO NOME NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
    } else {
        entradaDeDados.question("Digite o nome do produto: ", function (nomeProduto) {
            let produto = nomeProduto

            if (produto == "" || !isNaN(produto)) {
                console.log("ERRO: O CAMPO PRODUTO NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
            } else {
                entradaDeDados.question("Insira o valor da compra: ", function (valorCompra) {
                    let compra = (Number(valorCompra)).toFixed(2)

                    if (compra == "" || isNaN(compra)) {
                        console.log("ERRO: O CAMPO VALOR DA COMPRA NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                    } else {
                        entradaDeDados.question("Insira a taxa de juros sem %: ", function (taxaJuros) {
                            let juros = Number(taxaJuros)
                            let jurosDecimal = juros / 100

                            if (juros == "" || isNaN(juros)) {
                                console.log("ERRO: O CAMPO TAXA DE JUROS NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                            } else {
                                entradaDeDados.question("Insira quantas vezes o produto foi parcelado: ", function (parcelasProduto) {
                                    let parcelas = Number(parcelasProduto)

                                    if (parcelas == "" || isNaN(parcelas)) {
                                        console.log("ERRO: O CAMPO DE PARCELAS NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                                    } else {
                                        entradaDeDados.question("O valor inserido foi em anos ou meses? (digite 1 para anos ou 2 para meses): ", function (tempoInformado) {
                                            let tempo = Number(tempoInformado)

                                            if (tempo == "" || isNaN(tempo) || tempo < 1 || tempo > 2) {
                                                console.log("ERRO: O CAMPO DE ANOS OU MESES NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                                            } else {

                                                let parcelamentoFinal
                                                if (tempo == 1) {
                                                    parcelamentoFinal = parcelas * 12
                                                } else if (tempo == 2) {
                                                    parcelamentoFinal = parcelas
                                                }

                                                let montante
                                                let valorDiferença

                                                montante = (compra * (1 + jurosDecimal) ** parcelamentoFinal).toFixed(2)
                                                valorDiferença = (montante - compra).toFixed(2)

                                                console.log("\n******************* [VIVA MODA] *******************\n")
                                                console.log(`Muito obrigado por realizar a sua compra conosco Sr(a) ${nome}`)
                                                console.log(`A compra do produto ${produto}, tem um valor de R$${compra}`)
                                                console.log(`A sua compra será parcelada em ${parcelamentoFinal} vezes e o Sr(a) pagará: R$${montante}`)
                                                console.log(`O acréscimo realizado ao valor de R$${compra} será de R$${valorDiferença}\n`)
                                                console.log("Muito obrigado por escolher a [VIVA MODA]")
                                                console.log("***************************************************\n")
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})