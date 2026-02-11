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

        ==  -> Permite a comparação de dois conteúdos.
        !=  -> Permite comparar a diferença de dois conteúdos.
        <   -> Permite validar o valor menor.
        >   -> Permite validar o valor maior.
        <=  -> Permite validar se o valor é menor ou igual.
        >=  -> Permite validar se o valor é maior ou igual.
        === -> Os dois primeiros validam o conteúdo e o último valida a tipagem (com base na lógica E).
        !== -> Os dois primeiros validam a diferença do conteúdo e o último valida a tipagem (com base na lógica E).
        ==! -> Permite comparar a igualdade de conteúdos e a diferença de tipagem de dados.

    Operadores lógicos

        || / OR  -> Significa "OU"
        && / AND -> Significa "E"
        ! / NOT  -> Significa "NÃO"

    Formas de conversão de tipos de dados
        paseInt()   -> Permite converter um conteúdo em número do tipo INTEIRO.
        paseFloar() -> Permite converter um conteúdo em número do tipo DECIMAL.
        Number()    -> Permite converter um conteúdo para NUMERO, podendo ser inteiro ou decimal.
        String()    -> Permite converter um conteúdo em STRING.
        Boolean()   -> Permite converter um conteúdo para BOOLEANO (true ou false).

        typeof()    -> Retorna o tipo de dados de uma variável (String, Number, Boolean ou Object).

*/

//Não está em maiusculo pois é uma biblioteca que não é minha, se for minha eu posso deixar em maiusculo
const readline = require("readline") //Import da biblioteca de entrada de dados

// Criação do objeto para captar as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Entrada de dados do nome
entradaDeDados.question("Digite o nome do aluno: ", function (nome) {

    //Recebe o nome do aluno
    let nomeAluno = nome

    //Entrada de dados da nota 1
    entradaDeDados.question("Digite a primeira nota: ", function (valor1) {
        let nota1 = valor1

        //Entrada de dados da nota 2
        entradaDeDados.question("Digite a segunda nota: ", function (valor2) {
            let nota2 = valor2

            //Entrada de dados da nota 3
            entradaDeDados.question("Digite a terceira nota: ", function (valor3) {
                let nota3 = valor3

                //Entrada de dados da nota 4
                entradaDeDados.question("Digite a quarta nota: ", function (valor4) {
                    let nota4 = valor4

                    let media = calcularMedia(nota1, nota2, nota3, nota4)
                    let status = verificarStatus(calcularMedia)

                    if (media) {
                        console.log(`\nNOME: ${nomeAluno} \nMÉDIA FINAL: ${media} \nSTATUS DE APROVAÇÃO: ${status}`)
                    } else {
                        console.log("ERRO: Não foi possível processar o cálculo")
                        entradaDeDados.close
                    }

                    //Cálculo da média

                    //let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4)) / 4

                    //Validação do status do aluno
                    // let status
                    // if(media >= 70.00){
                    //     status = "Aprovado"
                    // }else if(media < 50.00){
                    //     status = "Reprovado"
                    // }else{
                    //     status = "Recuperação"
                    // }

                    //Exibir boletim do aluno
                    //toFixed() -> É um método que permite fixar a quantidade de casas decimais


                }) //Fecha nota 4
            }) //Fecha nota 3
        }) //Fecha nota 2
    }) //Fecha nota 1
}) //Fecha nome

function calcularMedia(nota1, nota2, nota3, nota4) {
    let n1 = Number(nota1)
    let n2 = Number(nota2)
    let n3 = Number(nota3)
    let n4 = Number(nota4)

    if (nota1 == "" || nota1 < 0 || nota1 > 100 ||isNaN(nota1) ||
        nota2 == "" || nota2 < 0 || nota2 > 100 ||isNaN(nota2) ||
        nota3 == "" || nota3 < 0 || nota3 > 100 ||isNaN(nota3) ||
        nota4 == "" || nota4 < 0 || nota4 > 100 ||isNaN(nota4)) {
        return false
    } else {
        let media = (n1 + n2 +n3 + n4) / 4
        return media.toFixed(2)
    }
}

function verificarStatus(calcularMedia) {
    let media = calcularMedia
    let status

    if (media) {
        if (media >= 70.00) {
            status = "Aprovado"
        } else if (media < 50.00) {
            status = "Reprovado"
        } else {
            status = "Recuperação"
        }

        return status
    }else{
        return false
    }
}