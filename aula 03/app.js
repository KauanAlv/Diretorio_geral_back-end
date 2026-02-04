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
entradaDeDados.question("Digite o nome do cliente: ", function(nomeCliente){
    let nome = nomeCliente

    entradaDeDados.question("Digite o nome do produto: ", function(nomeProduto){
        let produto = nomeProduto

        entradaDeDados.question("Insira o valor da compra: ", function(valorCompra){
            let compra = Number(valorCompra)

            entradaDeDados.question("Insira a taxa de juros sem %: ", function(taxaJuros){
                let juros = Number(taxaJuros)

                entradaDeDados.question("Insira quantas vezes o produto foi parcelado: ", function(vezesPagamento){
                    let vezes = Number(vezesPagamento)

                    entradaDeDados.question("O valor inserido foi em anos ou meses? (digite 1 para anos ou 2 para meses): ", function(tempoInformado){
                        let tempo = Number(tempoInformado)

                    
                        //VALIDAÇÃO DOS CAMPOS VAZIOS
                        if(nome == "" || produto == "" || compra == "" || juros == "" || vezes == "" || tempo == ""){
                            console.log("ERRO: EXISTEM CAMPOS OBRIGATÓRIOS QUE NÂO FORAM PREENCHIDOS!!!")

                        //VALIDAÇÃO DE NÚMEROS EM CAMPOS DE TEXTO
                        }else if(!isNaN(nome) || !isNaN(produto)){
                            console.log("ERRO: SOMENTE TEXTO É PERMITIDO NOS CAMPOS DE NOME")

                        //VALIDAÇÃO DE TEXTO EM CAMPOS DE NÚMEROS
                        }else if(isNaN(compra) || isNaN(juros) || isNaN(vezes) || isNaN(tempo)){
                            console.log("ERRO: SOMENTE NÚMEROS SÂO PERMITIDOS NOS CAMPOS DE VALORES")
                        }else if(tempo == "1"){
                            tempo * 12
                            console.log(tempo)
                        }
                    })
                })
            })
        })
    })
})