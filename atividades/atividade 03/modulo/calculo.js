/**********************************************************************************
 * Objetivo: Arquivo responsável por armazenar e manter as funções de cálculo
 * Autor: Kauan
 * Data: 26/02/2026 - (quinta-feira)
 * Versão 1.0
 **********************************************************************************/

//Funções em seta de operações básicas
const somar         = (numero1, numero2) => Number(numero1) + Number(numero2)
const subtrair      = (numero1, numero2) => Number(numero1) - Number(numero2)
const multiplicar   = (numero1, numero2) => Number(numero1) * Number(numero2)
const dividir       = (numero1, numero2) => Number(numero1) / Number(numero2)
const elevar        = (numero1, numero2) => Number(numero1) ** Number(numero2)
const maior         = (numero1, numero2) => Number(numero1) > Number(numero2)

module.exports = {
    //Deixa as funções de operadores matemáticos públicos
    somar, subtrair, multiplicar, dividir, elevar, maior
}