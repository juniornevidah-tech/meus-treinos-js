const carrinho = [
    {
        nome: "Camisa Da Nike",
        preco: 100
    },
    
    {
        nome: "Tenis Jordan",
        preco: 400
    },

    {
        nome: "Chuteira Nike",
        preco: 300
    },

    {
        nome: "Mochila Nike prime",        preco: 200
    }
]

let total = 0

carrinho.forEach(valor=> {
    const produtos = valor.preco

    total += produtos
});

function aplicarDesconto() {
    const desconto = 100;

    total -= desconto
}
aplicarDesconto();

console.log(` O total do carrinho com desconto e: ${total}`)


async function processarPagamentos() {
    console.log("Conectando com o Banco de Cartoes... Aguarde.");

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log(" Pagamento Aprovado com Sucesso!");
}

// 2. Chame a funçao no final do arquivo
processarPagamentos();

// Testando branches no Git