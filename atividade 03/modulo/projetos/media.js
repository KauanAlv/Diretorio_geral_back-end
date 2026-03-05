/*************************************************************************
 * Objetivo: Arquivo responsável por realizar a média escolar
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const calculosMatematicos = require('../calculo')

//Função para validar se as notas estão escritas entre 0 e 100
const validarNotasEntre = function (nota) {
    let notaValor = Number(nota)

    if (notaValor >= 0 && notaValor <= 100) {
        return true
    } else {
        return false
    }
}

//Função para calcular a média escolar
const calcularMedia = function (nota1, nota2, nota3, nota4) {
    let valorNota1 = Number(nota1)
    let valorNota2 = Number(nota2)
    let valorNota3 = Number(nota3)
    let valorNota4 = Number(nota4)
    let media

    media = Number(calculosMatematicos.dividir(calculosMatematicos.somar(calculosMatematicos.somar(valorNota1, valorNota2), calculosMatematicos.somar(valorNota3, valorNota4)), 4))

    return media.toFixed(2)
}

//Função para calcular o status do aluno
const calcularStatusMedia = function (statusMedia) {
    let media = Number(statusMedia)
    let status = ''

    if (media >= 70) {
        status = 'aprovado'
    } else if (media >= 50 && media < 70) {
        status = 'recuperação'
    } else {
        status = 'reprovado'
    }
    return status
}

//Função para calcular a média do exame
const calcularMediaExame = function (media, notaExame) {
    let valorMedia = Number(media)
    let ValorRec = Number(notaExame)
    let mediaFinal

    mediaFinal = calculosMatematicos.dividir(calculosMatematicos.somar(valorMedia, ValorRec), 2)
    return mediaFinal
}

//Função para validar se o aluno foi aprovado ou reprovado no exame
const validarStatusExame = function (media) {
    let mediaRec = Number(media)
    let status = ''

    if (mediaRec >= 60) {
        status = 'aprovado'
    } else {
        status = 'reprovado'
    }
    return status
}

//Função para retornar o genêro do professor ou professora
const verificarGeneroProf = function (generoProf) {
    let generoVerificado = String(generoProf).trim().toUpperCase()
    let sexo = ''

    if (generoVerificado === 'HOMEM' || generoVerificado === 'MASCULINO') {
        sexo = 'Professor'
    } else if (generoVerificado === 'MULHER' || generoVerificado === 'FEMININO') {
        sexo = 'Professora'
    } else {
        return false
    }
    return sexo
}

//Função para retornar o genêro do aluno ou aluna
const verificarGeneroAlun = function (generoAlun) {
    let generoVerificado = String(generoAlun).trim().toUpperCase()
    let sexo = ''

    if (generoVerificado === 'HOMEM' || generoVerificado === 'MASCULINO') {
        sexo = 'Aluno'
    } else if (generoVerificado === 'MULHER' || generoVerificado === 'FEMININO') {
        sexo = 'Aluna'
    } else {
        return false
    }
    return sexo
}

module.exports = {
    validarNotasEntre,
    calcularMedia,
    calcularStatusMedia,
    calcularMediaExame,
    validarStatusExame,
    verificarGeneroProf,
    verificarGeneroAlun
}