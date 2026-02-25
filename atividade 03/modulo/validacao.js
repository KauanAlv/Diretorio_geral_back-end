/*************************************************************************
 * Objetivo: Arquivo responsável pela validação dos dados
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const validarEntradaString = function (dado) {
    let dadoInfor = String(dado)

    if (dado.trim() === '' || !isNaN(dado))
        return false
    else
        return true

}

const validarEntradaNumber = function (valor) {
    let valorInfor = Number(valor)

    if(valor.trim() === '' || isNaN(valor))
        return false
    else
        return true
}

module.exports = {
    validarEntradaString,
    validarEntradaNumber
}