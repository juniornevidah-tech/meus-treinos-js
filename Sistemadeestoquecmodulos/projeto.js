class Produto {
    constructor(nome, preco, quantidade, categoria, id) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade
        this.categoria = categoria
        this.id = id
    }
}
class Estoque {
    constructor() {
        this.produtos = []
    }

    adicionarProdutos(produto) {
        this.produtos.push(produto)
    }

    removerProduto(id) {
        let index = this.produtos.findIndex(item => item.id === id)

        if (index !== -1) {
            this.produtos.splice(index, 1)
        }
    }

    Pesquisa(nome) {
        let Buscar = this.produtos.find(item => item.nome === nome)

        if (!Buscar) {
            return ("Produto nao encontrado")
        } else {
            return Buscar;
        }
    }
    listaProdutos() {
        let lista = document.getElementById("ListaDeProdutos")

        lista.innerHTML = "";

        for (let i = 0;i < this.produtos.length;i++) {
            let li = document.createElement("li")

            li.textContent = `Nome: ${this.produtos[i].nome} Preço: ${this.produtos[i].preco} Quantidade: ${this.produtos[i].quantidade} Categoria: ${this.produtos[i].categoria} Id: ${this.produtos[i].id}`
            lista.appendChild(li)
            let botao = document.createElement("button")
            botao.textContent = "Excluir"

            let index = i;

            botao.addEventListener("click", function() {
                estoque.produtos.splice(index, 1)
                salvarDados()
                estoque.atualizaResumo()
                estoque.listaProdutos()
            })
            li.appendChild(botao)
        }
    }
    atualizaResumo() {
        let totalProdutos = 0
        let valorTotal = 0

        let mostraproduto = document.getElementById("TotalDeProdutos")
        let mostraEstoque = document.getElementById("ValorTotalDeEstoque")
        for (let i = 0;i < this.produtos.length;i++) {
            let somar = this.produtos[i].quantidade
            let preço = this.produtos[i].preco

            totalProdutos += somar

            valorTotal += preço * somar

        }
        document.getElementById("TotalDeProdutos").textContent = `Resultado Total De Produtos: ${totalProdutos}`
        mostraEstoque.innerHTML = `Resultado Total do Valor: ${valorTotal}`

    }


} 
const estoque = new Estoque()

function adicionarProdutos() {
    let inputext = document.getElementById("NomeDoProduto").value
    let inputNumber = Number(document.getElementById("Preco").value)
    let selectQuanti = document.getElementById("Quantidade").value
    let selectCatego = document.getElementById("Categoria1").value
    let geraId = () => Date.now().toString();
    if (inputext === "") {
        alert("Digite algo Por favor!")
        return;
    } else if (isNaN(inputNumber) || inputNumber <= 0) {
        alert("Por favor Digite um numero!")
        return;
    }
    let produto = new Produto(inputext, inputNumber, selectQuanti, selectCatego, geraId())
    estoque.adicionarProdutos(produto)
    salvarDados()
    estoque.listaProdutos()
    estoque.atualizaResumo()

}

function salvarDados() {
    let salvar = localStorage.setItem("Produto", JSON.stringify(estoque.produtos))
}

function carregarDados() {
    let Carregar = localStorage.getItem("Produto")

    if (Carregar) {
        estoque.produtos = JSON.parse(Carregar)
        estoque.listaProdutos()
        estoque.atualizaResumo()
    }
}
carregarDados()