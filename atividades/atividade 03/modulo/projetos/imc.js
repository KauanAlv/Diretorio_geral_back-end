/*************************************************************************
 * Objetivo: Arquivo responsável por realizar o cálculo do imc
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require('../calculo')

//Valida a unidade de medida escolhida pelo usuário
const validarUnidadeMedidaAltura = function (unidadeMedida) {
    let medida = unidadeMedida.toUpperCase()
    if (medida === 'CM' || medida === 'M') {
        return true
    } else {
        return false
    }
}

//Calcula o imc do usuário
const calcularImc = function (peso, altura, unidadeMedida) {
    let pesoUsuario = Number(peso)
    let alturaUsuario = Number(altura)
    let medida = unidadeMedida
    let imc

    if (medida === 'CM')
        alturaUsuario = calculosMatematicos.dividir(alturaUsuario, 100)

    imc = (calculosMatematicos.dividir(pesoUsuario, calculosMatematicos.elevar(alturaUsuario, 2))).toFixed(2)
    return imc
}

//Classificar o imc do usuário
const verificarClassificacao = function (imc) {
    let imcResult = imc
    let classificacao = ''

    if (imcResult < 18.5) {
        classificacao = 'Abaixo do peso!!!'
    } else if (imcResult <= 24.9) {
        classificacao = 'Peso normal!!!'
    } else if (imcResult <= 29.9) {
        classificacao = 'Acima do peso (sobrepeso)'
    } else if (imcResult <= 34.9) {
        classificacao = 'Obesidade I'
    } else if (imcResult <= 39.9) {
        classificacao = 'Obesidade II'
    } else {
        classificacao = 'Obesidade III'
    } 
    
    return classificacao
}

module.exports = {
    validarUnidadeMedidaAltura,
    calcularImc,
    verificarClassificacao
}