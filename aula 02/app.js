/**************************************************************************
 * Objetivo: Projeto para realizar o calculo de médias escolares
 * Autor: Kauan
 * Data: 29/01/2026 (quinta-feira)
 * Versão: 1.0
 **************************************************************************/

/* 
    Tipos de criação de variáveis

    var -> Permite criar um espaço em memória  do tipo variável.
            Essa forma de criação hoje é considerada mais antiga,
            é provável que seja encontrada apenas em projetos
            mais antigos.
            Dica: Caso você precise utilizar o var, recomenda-se
            que seja utilizado apenas em escopo global (variáveis
            criadas no topo do projeto e que vai ser utilizada em
            várias funções).

    let -> Permite criar um espaço em memória do tipo variável.
            Essa forma de criação é realizada somente no escopo
            local, ou seja, dentro de bloco de programação {  }.
            Esse tipo de variável deixa de existir ao término do
            bloco.

    const -> Permite criar um espaço em memória do tipo constante,
            ou seja, esse conteúdo não poderá sofrer mudanças durante
            o projeto.
            Dica: Se possível você pode criar essa const escrita em
                MAIUSCULO para facilitar a sua utilização. Pode ser
                criada de forma local ou global.

    Operadores de comparação

        ==  -> Permite a comparação de dois conteúdos
        !=  -> Permite comparar a diferença de dois conteúdos
        <   -> Permite validar o valor menor
        >   -> Permite validar o valor maior
        <=  -> Permite validar se o valor é menor ou igual
        >=  -> Permite validar se o valor é maior ou igual
        === -> Os dois primeiros validam o conteúdo e o último valida a tipagem (com base na lógica E)
        !== -> Os dois primeiros validam a diferença do conteúdo e o último valida a tipagem (com base na lógica E)
        ==! -> Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados

    Operadores lógicos

        || / OR  -> Significa "OU"
        && / AND -> Significa "E"
        ! / NOT  -> Significa "NÃO"

*/

//Não está em maiusculo pois é uma biblioteca que não é minha, se for minha eu posso deixar em maiusculo
const readline = require("readline") //Import da biblioteca de entrada de dados
const { isStringObject } = require("util/types")

// Criação do objeto para captar as entradas de dados
const entradaDeDados = readline.createInterface({
  input: process.stdin,
  output: process.stdout  
})

//Entrada de dados do nome
entradaDeDados.question("Digite o nome do aluno: ", function(nome){

    //Recebe o nome do aluno
    let nomeAluno = nome 

    //Entrada de dados da nota 1
    entradaDeDados.question("Digite a primeira nota: ", function(valor1){
        let nota1 = valor1

        //Entrada de dados da nota 2
        entradaDeDados.question("Digite a segunda nota: ", function(valor2){
            let nota2 = valor2

            //Entrada de dados da nota 3
            entradaDeDados.question("Digite a terceira nota: ", function(valor3){
                let nota3 = valor3

                //Entrada de dados da nota 4
                entradaDeDados.question("Digite a quarta nota: ", function(valor4){
                    let nota4 = valor4

                    //Validação de entrada vazia
                    if(nomeAluno == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == ""){
                        console.log("ERRO: Existem campos obrigatórios que não foram preenchidos !!!")

                    //Validação de entrada de números apenas entre 0 até 100
                    }else if(nota1 < 0 || nota1 > 100 || nota2 < 0 || nota2 > 100 || nota3 < 0 || nota3 > 100 || nota4 < 0 || nota4 > 100){
                        console.log("ERRO: As notas informadas não estão dentro do padrão")

                    //Validação de entrada somente de números
                    //isNAN() significa -> É não um número, ou seja, verifica se o *conteúdo* é um número ou não.
                    //Caso seja letra ele retorna true, caso seja número ele retorna false
                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log("ERRO: Somente números são permitidos na entrada das notas")
                    }
                }) //Fecha nota 4
            }) //Fecha nota 3
        }) //Fecha nota 2
    }) //Fecha nota 1
}) //Fecha nome
