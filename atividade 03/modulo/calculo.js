/**********************************************************************************
 * Objetivo: Arquivo responsável por realizar o cálculo dos operadores matématicos
 * Autor: Kauan
 * Data: 26/02/2026 - (quinta-feira)
 * Versão 1.0
 **********************************************************************************/

const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar        = (numero1, numero2) => Number(numero1) ** Number(numero2)

module.exports = {
    somar,
    subtrair,
    multiplicar,
    dividir,
    elevar
}