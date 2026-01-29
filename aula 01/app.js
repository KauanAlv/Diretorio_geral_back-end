// Comentário em Linha

/*
    Comentário
        em
    Bloco
*/

//Permite exibir um conteúdo no terminal, basta entrar no diretório e digitar node app.js por exemplo
console.log('Testanto o JS') // Pode-se usar "" ou '' e não é obrigatório o uso de ;

//Para criar uma variável não é necessário ex: String, Double..
var nome = 'Kauan'

//Fazendo isso, será exibido no terminal o que está na variável, neste caso a variável é nome
console.log(nome)

//Concatenando os dados de variável com texto
console.log('O nome do usuário é: ' + nome)

//Outra forma de concatenar, é mais fácil apenas quando for concatenar várias coisas e não precisa ficar abrindo e fechando aspas (tem que utilizar a crase ``)
console.log(`O nome do usuário é: ${nome}`)

//Import da biblioteca do readline
//readline -> serve para permitir a entrada de dados via terminal
var readline = require('readline')

//Cria um objeto especialista em entrada de dados pelo terminal (input receber os dados e output devolver os dados recebidos)
var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/*
Permite a entrada de dados do nome do usuário
question -> utiliza uma função CALLBACK para devolver o valor digitado
CALLBACK -> É uma função particuplar de um método, que é chamada para encaminhar um conteúdo para o desenvolvedor, esse conteúdo vem através da variável no argumento "nomeUsuario"
*/
entradaDeDados.question("Digite seu nome: ", function(nomeUsuario){ //Aqui se usa a função de CALLBACK, o método question manda a pergunta, o usuário responde e com essa resposta ele manda para dentro da função
    console.log("O nome digitado foi: " + nomeUsuario) //Com a resposta dentro da função, pode-se usar de qualquer forma, como no nosso exemplo, utilizamos para aparecer no terminal através do console

    entradaDeDados.question("Digite seu email: ", function(emailUsuario){
        console.log(`O email do usuário ${nomeUsuario} é ${emailUsuario}`)
    })
})