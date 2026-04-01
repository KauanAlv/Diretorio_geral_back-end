/**********************************************************************
 * Objetivo: Arquivo responsável pelas funções de cálculos financeiros
 * Autor: Kauan
 * Data: 11/02/2026 - (quarta-feira)
 * Versão 1.0
 **********************************************************************/

//Função para retornar o percentual de um número
function calcularPercentual(numero) {
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
        let percentual = calcularPercentual(taxaJuros)

        if (percentual) {
            //Calculo
            let montante = valorPrincipal * (1 + percentual) ** qtdeParcelas
            return Number(montante.toFixed(2))
        } else {
            return false
        }
    }
}

//Todas as funções públicas, fazendo com que outros arquios possam utiliza-lo
module.exports = {
    calcularJurosCompostos,
    calcularPercentual
}