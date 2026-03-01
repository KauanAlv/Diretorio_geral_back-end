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
let media = require('./modulo/projetos/media.js')
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

        if (calculadoraEscolhida == 'MÉDIA' || calculadoraEscolhida == 'MEDIA') {
            entradaDeDados.question('Qual o nome do aluno?: ', function (nomeAluno) {
                let nomeA = nomeAluno.trim()
                let nomeAlunoVal = validacao.validarEntradaString(nomeAluno)

                if (nomeAlunoVal) {
                    entradaDeDados.question('Qual o sexo do aluno?: ', function (sexoAluno) {
                        let generoStringAluno = validacao.validarEntradaString(sexoAluno)
                        let generoAluno = media.verificarGeneroAlun(sexoAluno)

                        if (generoAluno && generoStringAluno) {
                            entradaDeDados.question('Qual o nome do professor?: ', function (nomeProfessor) {
                                let nomeProf = nomeProfessor.trim()
                                let nomeProfVal = validacao.validarEntradaString(nomeProfessor)

                                if (nomeProfVal) {
                                    entradaDeDados.question('Qual o sexo do profesor?: ', function (sexoProfessor) {
                                        let generoStringProfessor = validacao.validarEntradaString(sexoProfessor)
                                        let generoProfessor = media.verificarGeneroProf(sexoProfessor)

                                        if (generoProfessor && generoStringProfessor) {
                                            entradaDeDados.question('Qual o nome do curso?: ', function (curso) {
                                                let nomeCurso = curso.trim()
                                                let nomeCursoVal = validacao.validarEntradaString(curso)

                                                if (nomeCursoVal) {
                                                    entradaDeDados.question('Qual o nome da disciplina?: ', function (disciplina) {
                                                        let nomeDisciplina = disciplina.trim()
                                                        let nomeDiscVal = validacao.validarEntradaString(disciplina)

                                                        if (nomeDiscVal) {
                                                            entradaDeDados.question('Informe a primeira nota: ', function (nota1) {
                                                                let valorN1 = nota1.replace(',', '.')
                                                                let tamanhoN1 = media.validarNotasEntre(valorN1)
                                                                let valorN1Val = validacao.validarEntradaNumber(valorN1)

                                                                if (valorN1Val && tamanhoN1) {
                                                                    entradaDeDados.question('Informe a segunda nota: ', function (nota2) {
                                                                        let valorN2 = nota2.replace(',', '.')
                                                                        let tamanhoN2 = media.validarNotasEntre(valorN2)
                                                                        let valorN2Val = validacao.validarEntradaNumber(valorN2)

                                                                        if (valorN2Val && tamanhoN2) {
                                                                            entradaDeDados.question('Informe a terceira nota: ', function (nota3) {
                                                                                let valorN3 = nota3.replace(',', '.')
                                                                                let tamanhoN3 = media.validarNotasEntre(valorN3)
                                                                                let valorN3Val = validacao.validarEntradaNumber(valorN3)

                                                                                if (valorN3Val && tamanhoN3) {
                                                                                    entradaDeDados.question('Informe a quarta nota: ', function (nota4) {
                                                                                        let valorN4 = nota4.replace(',', '.')
                                                                                        let tamanhoN4 = media.validarNotasEntre(valorN4)
                                                                                        let valorN4Val = validacao.validarEntradaNumber(valorN4)

                                                                                        if (valorN4Val && tamanhoN4) {
                                                                                            let mediaFinal = media.calcularMedia(valorN1, valorN2, valorN3, valorN4)
                                                                                            let status = media.calcularStatusMedia(mediaFinal)

                                                                                            if (status == 'aprovado' || status == 'reprovado') {
                                                                                                console.log(`\nRelatório ${generoAluno}:`)
                                                                                                console.log(`\nO ${generoAluno} ${nomeA} foi ${status} na disciplina ${nomeDisciplina}.`)
                                                                                                console.log(`Curso: ${nomeCurso}`)
                                                                                                console.log(`${generoProfessor}: ${nomeProf}`)
                                                                                                console.log(`Notas do ${nomeA}: ${valorN1}, ${valorN2}, ${valorN3} e ${valorN4}.`)
                                                                                                console.log(`Média final: ${mediaFinal}`)

                                                                                            } else if (status == 'recuperação') {
                                                                                                entradaDeDados.question('Informe a nota da recuperação: ', function (notaRecuperacao) {
                                                                                                    let notaRec = notaRecuperacao.replace(',', '.')
                                                                                                    let valorRec = validacao.validarEntradaNumber(notaRecuperacao)
                                                                                                    let tamanhoRec = media.validarNotasEntre(notaRecuperacao)

                                                                                                    if (valorRec && tamanhoRec) {
                                                                                                        let mediaRec = media.calcularMediaExame(mediaFinal, notaRec)
                                                                                                        let statusFinal = media.calcularStatusMedia(mediaRec)

                                                                                                        console.log(`\nRelatório ${generoAluno}:`)
                                                                                                        console.log(`\nO ${generoAluno} ${nomeA} foi ${statusFinal} na disciplina ${nomeDisciplina}.`)
                                                                                                        console.log(`Curso: ${nomeCurso}`)
                                                                                                        console.log(`${generoProfessor} ${nomeProf}`)
                                                                                                        console.log(`Notas do ${nomeA}: ${valorN1}, ${valorN2}, ${valorN3}, ${valorN4} e ${notaRec}.`)
                                                                                                        console.log(`Média final: ${mediaFinal}`)
                                                                                                        console.log(`Média final do exame: ${mediaRec}`)
                                                                                                        entradaDeDados.close()

                                                                                                    } else {
                                                                                                        console.log('A nota da recuperação está escrita incorretamente!!!\n')
                                                                                                        entradaDeDados.close()
                                                                                                    }
                                                                                                })
                                                                                            }

                                                                                        } else {
                                                                                            console.log('A quarta nota está escrita incorretamente!!!\n')
                                                                                            entradaDeDados.close()
                                                                                        }
                                                                                    })
                                                                                } else {
                                                                                    console.log('A terceira nota está escrita incorretamente!!!\n')
                                                                                    entradaDeDados.close()
                                                                                }
                                                                            })
                                                                        } else {
                                                                            console.log('A segunda nota está escrita incorretamente!!!\n')
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })
                                                                } else {
                                                                    console.log('A primeira nota está escrita incorretamente!!!\n')
                                                                    entradaDeDados.close()
                                                                }
                                                            })
                                                        } else {
                                                            console.log('O nome da disciplina está escrito incorretamente!!!\n')
                                                            entradaDeDados.close()
                                                        }
                                                    })
                                                } else {
                                                    console.log('O nome do curso está escrito incorretamente!!!\n')
                                                    entradaDeDados.close()
                                                }
                                            })
                                        } else {
                                            console.log('O genêro do professor está escrito incorretamente!!!\n')
                                            entradaDeDados.close()
                                        }
                                    })
                                } else {
                                    console.log('O nome do professor está escrito incorretamente!!!\n')
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('O genêro do aluno está escrito incorretamente!!!\n')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('O nome do aluno está escrito incorretamente!!!\n')
                    entradaDeDados.close()
                }
            })
        }
    } else {
        console.log('Essa calculadora não existe!!!\n')
        entradaDeDados.close()
    }
})