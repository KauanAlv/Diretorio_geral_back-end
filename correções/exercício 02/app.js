/**********************************************************************
 * Objetivo: Arquivo responsável SOMENTE pela entrada e sáida de dados
 * Data: 20/02/2026
 * Autor: Kauan
 * Versão: 1.0
***********************************************************************/

//Import da biblioteca de calculos
const calculosMatematicos = require('./modulo/calculo.js')

let n1 = '105'
let n2 = 20
let operador = ''

let validar = calculosMatematicos.validarDados(n1, n2, operador)

if(validar){
    let result = calculosMatematicos.calcular(n1, n2, operador)
    if(result)
        console.log(result)
    else
        console.log('ERRO: Não foi possível fazer o calculo')
}else{
    console.log('ERRO: Validação de dados incorreta')
}