/*************************************************************************
 * Objetivo: Arquivo responsável por realizar a média escolar
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require('../calculo')

const validarNotasEntre = function (nota) {
    let notaValor = Number(nota)

    if (notaValor >= 0 && notaValor <= 100) {
        return true
    } else {
        return false
    }
}

const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let valorNota1 = Number(nota1)
    let valorNota2 = Number(nota2)
    let valorNota3 = Number(nota3)
    let valorNota4 = Number(nota4)
    let media

    media = Number(calculosMatematicos.dividir(calculosMatematicos.somar(calculosMatematicos.somar(valorNota1, valorNota2), calculosMatematicos.somar(valorNota3, valorNota4)), 4))

    if (media) {
        return media.toFixed(2)
    } else {
        return false
    }
}

const calcularStatusMedia = function (statusMedia) {
    let media = Number(statusMedia)
    let status

    if (media) {
        if (media >= 70) {
            status = 'aprovado'
        } else if (media <= 50) {
            status = 'reprovado'
        } else {
            status = 'recuperação'
        }
        return status
    } else {
        return false
    }
}

const calcularMediaExame = function (media, notaExame){
    let valorMedia = Number(media)
    let ValorRec = Number(notaExame)
    let mediaFinal

    mediaFinal = calculosMatematicos.dividir(calculosMatematicos.somar(valorMedia, ValorRec), 2)

    if(mediaFinal >= 60){
        return 'aprovado'
    }else{
        return 'reprovado'
    }
}

module.exports = {
    validarNotasEntre,
    calcularMedia,
    calcularStatusMedia,
    calcularMediaExame
}
