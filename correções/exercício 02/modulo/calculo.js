/*********************************************************************************************************************
 * Objetivo: Arquivo responsável pelo processamento de cálculos matemáticos (SOMAR, SUBTRAIR, MULTIPLICAR E DIVIDIR)
 * Data: 29/02/2026
 * Autor: Kauan
 * Versão: 1.0
*********************************************************************************************************************/
//toUpperCase() -> Retorna uma String em MAIÚSCULO
//toLowerCase() -> Retorna uma String em minúsculo


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
        case 'SOMAR': resultado = valor1 + valor2; break;
        case 'SUBTRAIR': resultado = valor1 - valor2; break;
        case 'MULTIPLICAR': resultado = valor1 * valor2; break;
        case 'DIVIDIR': resultado = valor1 / valor2; break;
    }

    //Saída da função
    if (resultado != undefined) {
        return resultado
    } else {
        return false
    }

}

//Chamando a função para testar
let result = calcular(20, 10, 'multiplicar')
console.log(result)

// if(result){
//     console.log(result)
// }else{
//     console.log('ERRO')
// }