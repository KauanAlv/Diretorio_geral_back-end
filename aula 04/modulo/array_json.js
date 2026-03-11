/********************************************************************
 * Objetivo: Manipular dados em ARRAY e JSON
 * Data: 05/03/2026
 * Autor: Marcel
 * Versão 1.0
 ********************************************************************/

/*
    [ ] -> representa um objeto do tipo ARRAY
    { } -> representa um objeto do tipo JSON

    Array -> É um espaço na memória para armazenar dados sem a necessidade de criar outros objetos, trabalhando com índices.
        Ex:
            let nome = 'José'
            let nome2 = 'Maria'
            let nome3 = 'João'

                índices     0       1       2
            let nomes = ['José', 'Maria', 'João']

    JSON -> É um espaço na memória para armaenar dados com CHAVE e VALOR, sem trabalhar com índices.
        Ex: 
            let nome     =  'José'
            let telefone =  '123456789'
            let email    =  'jose@gmail.com
            
                    ou     Atributo
                            Chave   Valor   Chave       Valor       Chave       Valor
            let cliente = {"nome": "José", "telefone": "123456789", "email": "jose@gmail.com"}
            Para o JSON é recomendado a utilização de aspas duplas.

    Array trabalha na vertical, em forma de colunas.
    JSON trabalha na horizontal, em forma de linhas.
*/

//Criando objetos do tipo ARRAY
const listaDeAlunos = ['José', 'Maria', 'Luiz', 'Antonio', 'Carlos']
const listaDeClientes = []
const listaDeFornecedores = []

const exibirDados = function () {
    //Exibe o objeto ARRAY com o seu conteúdo
    console.log(listaDeAlunos)

    //Exibe o tipo do dado de um índice, String, Number, Object....
    console.log(typeof (listaDeAlunos[2]))

    //Exibe o objeto ARRAY em formato de tabela, mostrando índice e conteúdo
    console.table(listaDeAlunos)

    console.log(listaDeAlunos[3])
    console.log(listaDeAlunos[0])

    console.log(`\nO nome do aluno é: ${listaDeAlunos[0]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[1]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[2]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[3]}`)
    console.log(`O nome do aluno é: ${listaDeAlunos[4]}`)

    //Usando o While
    console.log('\n********** Exemplo com While **********')
    let cont = 0
    while (cont < listaDeAlunos.length) {
        console.log(`O nome do aluno é: ${listaDeAlunos[cont]}`)
        cont += 1
    }

    //Usand o FOR
    console.log('\n********** Exemplo com FOR **********')
    for (let contador = 0; contador < listaDeAlunos.length; contador++) {
        console.log(`O nome do aluno é: ${listaDeAlunos[contador]}`)
    }

    //Usando o FOR EACH
    console.log('\n********** Exemplo com FOR EACH **********')
    listaDeAlunos.forEach(function (item) {
        console.log(`O nome do aluno é: ${item}`)
    })

    //Usando o FOR OF
    console.log('\n********** Exemplo com FOR OF **********')
    for (aluno of listaDeAlunos) {
        console.log(`O nome do aluno é: ${aluno}`)
    }

    //Usando o FOR IN
    console.log('\n********** Exemplo com FOR IN **********')
    for (item in listaDeAlunos) {
        console.log(`O nome do aluno é: ${listaDeAlunos[item]}`)
    }

    //Retorna a quantidade de itens em um array
    console.log(`\n${listaDeAlunos.length}`)
}

const manipularDados = function () {
    //Adicionando elementos de forma manual pelo índice
    listaDeClientes[0] = 'José da Silva'
    listaDeClientes[1] = 'Maria da Silva'
    listaDeClientes[2] = 'Luiz da Silva'
    listaDeClientes[3] = 'Ana da Silva'
    listaDeClientes[5] = 'Beatriz da Silva'

    console.log(listaDeClientes)

    //Permite adicionar novos elementos no ARRAY, sempre no final
    listaDeFornecedores.push('Antônio')
    listaDeFornecedores.push('Caio')
    listaDeFornecedores.push('Luiz')
    listaDeFornecedores.push('Hugo', 'Maria', 'José', 'André')

    console.table(listaDeFornecedores)

    //Permite adicionar novos elementos no ARRAY, sempre no INICIO,
    //Após adicionar o elemento, ele reorganiza todos os outros itens
    listaDeFornecedores.unshift('Luciano')

    console.table(listaDeFornecedores)

    //Permite adicionar um novo elemento em uma determinada posição do ARRAY
    //splice(indice, qtdeDeElementos, 'novo conteúdo')
    listaDeFornecedores.splice(3, 0, 'Bernado')

    console.table(listaDeFornecedores)

    //Permite remover um determinado conteúdo com base no indice do elemento ARRAY
    //splice(indice, qtde de elementos a ser removido)
    listaDeFornecedores.splice(6, 1)
    console.table(listaDeFornecedores)

    //Permite remover o ultimo elemento do ARRAY
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)

    //Permite remover o primeiro elemento do ARRAY, após remover, irá reorganizar
    //todos os elementos
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)
}

const removerIndice = function (escolhaDoNome) {

    //CÓDIGO COM indexOf()
    //indexOf() -> retorna o indice referente ao conteúdo que está sendo pesquisado,
    //não se deve utiliza-ló quando quer "varrer" mais de 1, porque ele da o valor apenas de 1 indice
    let indice = listaDeAlunos.indexOf(escolhaDoNome)
    listaDeAlunos.splice(indice, 1)

    // CÓDIGO COM FOR IN
    // for (cont in listaDeAlunos) {
    //     if (escolhaDoNome == listaDeAlunos[cont]) {
    //         listaDeAlunos.splice(cont, 1)
    //     }
    // }

    // CÓDIGO COM FOR
    // for (nome = 0; listaDeAlunos[nome] !== escolhaDoNome; nome++) { }

    // if (listaDeAlunos[nome] == escolhaDoNome)
    // listaDeAlunos.splice(nome, 1)
}

const validarItem = function (nomeAluno) {
    //Verifica se o conteúdo existe dentro do ARRAY e retorna (true/false)
    return listaDeAlunos.includes(nomeAluno)
}

//exibirDados()
//manipularDados()
// removerIndice('Maria')
// console.table(listaDeAlunos)
console.log(validarItem('Maria'))