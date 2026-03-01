/*************************************************************************
 * Objetivo: Arquivo responsável por receber informações do usuário
 * Autor: Kauan
 * Data: 25/02/2026 - (quarta-feira)
 * Versão 1.0
 *************************************************************************/

const readline = require('readline')

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let validacao = require('./modulo/validacao.js')
let calculo = require('./modulo/calculo.js')

// let fatorial = require('./modulo/projetos/fatorial.js')
let imc = require('./modulo/projetos/imc.js')
// let media = require('./modulo/projetos/media.js')
// let par_impar = require('./modulo/projetos/par_impar.js')
// let tabuada = require('./modulo/projetos/tabuada.js')

entradaDeDados.question('\nQual tipo de calculadora deseja utilizar? (Fatorial, IMC, Media, Par/impar, Tabuada?): ', function (calculadoraInformada) {
    let calculadoraEscolhida = calculadoraInformada.trim().toUpperCase()
    let validarCalculadora = validacao.validarEntradaString(calculadoraEscolhida)

    if (calculadoraEscolhida && validarCalculadora) {

        if (calculadoraEscolhida == 'IMC') {
            entradaDeDados.question('Digite o peso em kg, somente o número: ', function (peso) {
                let pesoInfor = peso.replace(',', '.')
                let pesoValidado = validacao.validarEntradaNumber(pesoInfor)

                if (pesoValidado) {
                    entradaDeDados.question('Qual será a unidade da altura? (m ou cm)?: ', function (unidade) {
                        let unidadeEsc = unidade.toUpperCase()
                        let unidadeValString = validacao.validarEntradaString(unidadeEsc)
                        let unidadeValAltura = imc.validarUnidadeMedidaAltura(unidadeEsc)

                        if (unidadeValString && unidadeValAltura) {
                            entradaDeDados.question(`Informe a altura em ${unidadeEsc}: `, function (altura) {
                                let alturaInformada = altura.replace(',', '.')
                                let alturaVal = validacao.validarEntradaNumber(alturaInformada)

                                if (alturaVal) {
                                    let resultadoDoIMC = imc.calcularImc(pesoInfor, alturaInformada, unidadeEsc)
                                    let classificacaoDoIMC = imc.verificarClassificacao(resultadoDoIMC)

                                    console.log(`\nO resultado do IMC calculado foi: ${resultadoDoIMC}`)
                                    console.log(`Este IMC está classificado como: ${classificacaoDoIMC}\n`)
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('A unidade de medida para a altura está escrita da forma errada!!!\n')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('O peso está escrito de forma errada!!!\n')
                    entradaDeDados.close()
                }
            })
        }

    } else {
        console.log("Essa calculadora não existe!!!\n")
        entradaDeDados.close()
    }


})
