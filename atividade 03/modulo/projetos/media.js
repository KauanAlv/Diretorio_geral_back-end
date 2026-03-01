/*************************************************************************
 * Objetivo: Arquivo responsável por realizar a média escolar
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require('../calculo')

const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let valorNota1 = Number(nota1)
    let valorNota2 = Number(nota2)
    let valorNota3 = Number(nota3)
    let valorNota4 = Number(nota4)
    let media

    media = calculosMatematicos.dividir(calculosMatematicos.somar(calculosMatematicos.somar(valorNota1, valorNota2),calculosMatematicos.somar(valorNota3, valorNota4)), 4)

    if (media) {
        return media.toFixed(2)
    } else {
        return false
    }
}

module.exports = {
    calcularMedia
}