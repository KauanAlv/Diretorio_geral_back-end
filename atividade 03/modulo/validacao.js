/*************************************************************************
 * Objetivo: Arquivo responsável pela validação dos dados
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const validarEntradaString = function (dado) {
    let dadoInfor = String(dado)

    if (dado === '' || !isNaN(dado)) {
        return false
    } else {
        return true
    }

}

const validarEntradaNumber = function (valor) {
    let valorInfor = Number(valor)

    if (valor.trim() === '' || isNaN(valor)) {
        return false
    } else {
        return true
    }
}

const validarNumeroInteiro = function (valorInt) {
    let int = Number(valorInt)

    if (Number.isInteger(int)) {
        return true
    } else {
        return false
    }
}

const validarEscolhaCalculadora = function (escolhaCalculadora) {
    let escolha = String(escolhaCalculadora.toUpperCase())
    let calculadoraEscolhida = ['PAR/IMPAR', 'IMPAR/PAR', 'IMPAR OU PAR', 'PAR OU IMPAR', 'IMPAR E PAR', 'PAR E IMPAR', 'IMPAR', 'PAR',
        'PAR/ÍMPAR', 'ÍMPAR/PAR', 'ÍMPAR OU PAR', 'PAR OU ÍMPAR', 'ÍMPAR E PAR', 'PAR E ÍMPAR', 'ÍMPAR',
        'IMC', 'MÉDIA', 'MEDIA', 'TABUADA', 'FATORIAL']

        if(calculadoraEscolhida.includes(escolha)) {
            return true
        } else {
            return false
        }
}

module.exports = {
    validarEntradaString,
    validarEntradaNumber,
    validarNumeroInteiro,
    validarEscolhaCalculadora
}