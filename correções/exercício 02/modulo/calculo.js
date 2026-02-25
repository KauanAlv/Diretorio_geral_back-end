/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo processamento de cálculos matemáticos (SOMAR, SUBTRAIR, MULTIPLICAR E DIVIDIR)
 * Data: 29/02/2026
 * Autor: Kauan
 * Versão: 1.0
*********************************************************************************************************************/
//toUpperCase() -> Retorna uma String em MAIÚSCULO
//toLowerCase() -> Retorna uma String em minúsculo

const validarDados = function (numero1, numero2, operador) {
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let tipoCalculo = String(operador)

    if(numero1 == '' || isNaN(numero1) || numero2 == '' || isNaN(numero2) || operador == ''){
        return false
    }else{
        return true
    }

}

//Exemplo de função anonima
//Função para calcular as 4 operações matemáticas
const calcular = function (numero1, numero2, operador) {

    //Entrada de dados da função
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()

    let resultado

    // //Processamento da função
    // if (operadorMatematico == 'SOMAR') {
    //     resultado = valor1 + valor2
    // } else if (operadorMatematico == 'SUBTRAIR') {
    //     resultado = valor1 - valor2
    // } else if (operadorMatematico == 'MULTIPLICAR') {
    //     resultado = valor1 * valor2
    // } else if (operadorMatematico == 'DIVIDIR') {
    //     resultado = valor1 / valor2
    // }

    switch (operadorMatematico) {
        case 'SOMAR': resultado = somar(valor1, valor2); break;
        case 'SUBTRAIR': resultado = subtrair(valor1, valor2); break;
        case 'MULTIPLICAR': resultado = multiplicar(valor1, valor2); break;
        case 'DIVIDIR': resultado = dividir(valor1, valor2); break;
    }

    //Saída da função
    if (resultado != undefined) {
        return resultado
    } else {
        return false
    }

}

//Função baseada em formato de seta (ARROW FUNCTION)
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)

module.exports = {
    calcular,
    somar,
    subtrair,
    multiplicar,
    dividir,
    validarDados
}