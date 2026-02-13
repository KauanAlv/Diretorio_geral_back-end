/**********************************************************************
 * Objetivo: Projeto para realizar o calculo de médias escolares
 * Autor: Kauan
 * Data: 13/02/2026 - (sexta-feira)
 * Versão 1.0
 **********************************************************************/

//Função que calcula a média escolar
function calcularMedia(nome, nota1, nota2, nota3, nota4) {
    let n1 = Number(nota1)
    let n2 = Number(nota2)
    let n3 = Number(nota3)
    let n4 = Number(nota4)
    let nomeAluno = nome

    //Validação de campos vazios, campos com números ou letras e campos maiores que 100 ou menores que 0
    if (nomeAluno == "" || !isNaN(nomeAluno) ||
        nota1 == "" || nota1 < 0 || nota1 > 100 || isNaN(nota1) ||
        nota2 == "" || nota2 < 0 || nota2 > 100 || isNaN(nota2) ||
        nota3 == "" || nota3 < 0 || nota3 > 100 || isNaN(nota3) ||
        nota4 == "" || nota4 < 0 || nota4 > 100 || isNaN(nota4)) {
        return false
    } else {
        //Se passar na validação, efetua o calculo da media e o retorno dela
        let media = (n1 + n2 + n3 + n4) / 4
        return media.toFixed(2)
    }
}

//Função para validar o status do aluno
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

        //Vai dar o retorno de acordo com a media
        return status
    } else {
        //Caso contrário, vai retornar false
        return false
    }
}

//Permite com que outros arquivos possam utilizar as funções
module.exports = {
    calcularMedia,
    verificarStatus
}