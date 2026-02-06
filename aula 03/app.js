/**************************************************************************
 * Objetivo: Projeto para realizar o cálculo do juros compostos de uma
 * empresa especializada na venda de roupas e acessórios.
 * Autor: Kauan
 * Data: 04/02/2026 (Quarta-feira)
 * Versão: 1.0
 **************************************************************************/

const readline = require("readline")
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Variavél que valida se há símbolos e quantidade mínima de caracteres
const verificadorSimbolo = /^[\p{L} ]{2,}$/u

//Entrada de dados com o nome do cliente
entradaDeDados.question("\nDigite o nome do cliente: ", function (nomeCliente) {
    let nome = nomeCliente

    //Validação de campo vazio ou número em campo somente de texto
    if (nome == "" || !isNaN(nome) || !verificadorSimbolo.test(nome)) {
        console.log("ERRO: O CAMPO NOME NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
    } else {
        //Entrada de dados do nome do produto
        entradaDeDados.question("Digite o nome do produto: ", function (nomeProduto) {
            let produto = nomeProduto

            //Validação de campo vazio ou número em campo somente de texto
            if (produto == "" || !isNaN(produto) || !verificadorSimbolo.test(produto)) {
                console.log("ERRO: O CAMPO PRODUTO NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
            } else {
                //Entrada de dados com o valor da compra
                entradaDeDados.question("Insira o valor da compra: ", function (valorCompra) {
                    let compra = (Number(valorCompra)).toFixed(2)

                    //Validação de campo vazio ou textto em campo somente de número
                    if (valorCompra == "" || isNaN(compra)) {
                        console.log("ERRO: O CAMPO VALOR DA COMPRA NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                    } else {
                        //Entrada de dados com a taxa de juros
                        entradaDeDados.question("Insira a taxa de juros sem %: ", function (taxaJuros) {
                            let juros = Number(taxaJuros)
                            juros = juros / 100

                            //Validação de campo vazio ou texto em campo somente de número
                            if (juros == "" || isNaN(juros)) {
                                console.log("ERRO: O CAMPO TAXA DE JUROS NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                            } else {
                                //Entrada de dados com o total de parcelas
                                entradaDeDados.question("Insira quantas vezes o produto foi parcelado: ", function (parcelasProduto) {
                                    let parcelas = Number(parcelasProduto)

                                    //Validação de campo vazio ou texto em campo somente de número
                                    if (parcelas == "" || isNaN(parcelas)) {
                                        console.log("ERRO: O CAMPO DE PARCELAS NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                                    } else {
                                        //Entrada de dados com o tempo de parcelas informado
                                        entradaDeDados.question("O valor inserido foi em anos ou meses?\n[digite 1 para anos]\n[digite 2 para meses]\n: ", function (tempoInformado) {
                                            let tempo = Number(tempoInformado)

                                            //Validação de campo vazio, texto em campo somente de número e se o tempo informado foi somente 1 ou 2
                                            if (tempo == "" || isNaN(tempo) || tempo < 1 || tempo > 2) {
                                                console.log("ERRO: O CAMPO DE ANOS OU MESES NÃO FOI PREENCHIDO CORRETAMENTE!!!\n")
                                            } else {

                                                //Se a parcela informada foi em anos, transformará em meses
                                                let parcelamentoFinal
                                                
                                                if (tempo == 1) {
                                                    parcelamentoFinal = parcelas * 12
                                                } else if (tempo == 2) {
                                                    parcelamentoFinal = parcelas
                                                }

                                                //Cálculo do juros composto
                                                let montante = (compra * (1 + juros) ** parcelamentoFinal).toFixed(2)
                                                let valorDiferença = (montante - compra).toFixed(2)

                                                //Relatório Final
                                                console.log("\n******************* [VIVA MODA] *******************\n")
                                                console.log(`Muito obrigado por realizar a sua compra conosco Sr(a) ${nome}`)
                                                console.log(`A compra do produto ${produto}, tem um valor de R$${compra}`)
                                                console.log(`A sua compra será parcelada em ${parcelamentoFinal} vezes e o Sr(a) pagará: R$${montante}`)
                                                console.log(`O acréscimo realizado ao valor de R$${compra} será de R$${valorDiferença}`)
                                                console.log("Muito obrigado por escolher a [VIVA MODA]")
                                                console.log("\n***************************************************\n")
                                            }
                                        })//Fecha parcelamento em anos ou meses
                                    }
                                })//Fecha o total de parcelas
                            }
                        })//Fecha a taxa de juros
                    }
                })//Fecha o valor da compra
            }
        })//Fecha o nome do produto
    }
})//Fecha o nome do cliente