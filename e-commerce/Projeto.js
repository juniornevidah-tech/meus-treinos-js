// variaveis globais
let inputPesquisar = document.getElementById("Buscar21")
let categoria = document.getElementById("categoria")
let Ordenar = document.getElementById("Ordenar")
let listaul = document.getElementById("lista")
let listaFavorito = document.getElementById("adicioanafavoritos")
let listaproduto = document.getElementById("listaproduto")
// array carrinho 
// array favorito
let carrinho = []
let favorito = []
// filtra produto 
let filtrar = []
// array de guarda os produtos buscado
let buscados = []
// objetos para ser usado 
let produtos = [
    {
        id: 1,
        nome: "Shampoo",
        preco: 30,
        categoria: "Higiene",
    },

    {
        id: 2,
        nome: "Cerveja",
        preco: 50,
        categoria: "Bebidas",
    },

    {
        id: 3,
        nome: "Fruta",
        preco: 10,
        categoria: "Frutas",
    },
    
    {
        id: 4,
        nome: "Maquiagem",
        preco: 100,
        categoria: "Beleza",
    },

    {
        id: 5,
        nome: "Suco",
        preco: 15,
        categoria: "Bebidas",
    },

    {
        id: 6,
        nome: "Recipientes",
        preco: 50,
        categoria: "Plastico",
    }
]
// function comprar
function adicionarCarrinho(id) {
    let achar = produtos.find(item => item.id === Number(id))
    let itemnoCarrinho = carrinho.find(item => item.id === Number(id))
    if (achar === undefined) {
        alert("Produto nao Encontrado!")
        return;
    }
    if (itemnoCarrinho) {
        itemnoCarrinho.Quantidade += 1
    } else {
        carrinho.push({
            ...achar,
            Quantidade: 1
        })
    }
    salvarLocalStorage()
    renderizarCarrinho()
}
// funçao remover 
function removerItem(id) {
    let index = carrinho.findIndex(item => item.id === Number(id))

    if (index === -1) {
        alert("Produto nao encontrado, Erro212!")
        return;
    } else if (carrinho[index].Quantidade > 1) {
            carrinho[index].Quantidade -= 1
        } else {
            carrinho.splice(index, 1)
        }
        salvarLocalStorage()
        renderizarCarrinho()
}  
// limpa carrinho 
function renderizarCarrinho() {
    let soma = 0
    listaul.innerHTML = "";
    let total = document.getElementById("Total")
    for (let i = 0;i < carrinho.length;i++) {
        let li = document.createElement("li")
        li.textContent = `Nome: ${carrinho[i].nome} Preço: ${carrinho[i].preco} Quantidade: ${carrinho[i].Quantidade}`
        listaul.appendChild(li)
        
        soma += carrinho[i].preco * carrinho[i].Quantidade


        let remover = document.createElement("button")
        remover.textContent = "❌"
        remover.addEventListener("click", function(){
            removerItem(carrinho[i].id)
        })
        li.appendChild(remover)
    }
    salvarLocalStorage()
    total.innerHTML = `Valor Total Dos Produtos: R$${soma}`
}
// adicionar aos favoritos
function favoritos(id) {
    let item = produtos.find(p => p.id === id)

    let existe = favorito.find(p => p.id === id)

    if (existe) {
        favorito = favorito.filter(f => f.id !== id)
    } else {
        favorito.push(item)
    }
    salvarLocalStorage()
    renderizarFavoritos()
}
// renderizar favoritos
function renderizarFavoritos() {
    listaFavorito.innerHTML = "";

    for (let i = 0;i < favorito.length;i++) {
        let li = document.createElement("li")
        li.textContent = `${favorito[i].nome} - ${favorito[i].preco}`
        listaFavorito.appendChild(li)
    }
}
// funçao buscar
function buscaProdutos(){
    let pesqui = inputPesquisar.value.trim().toLowerCase();
    buscados = [];
      if (pesqui === "") {
            buscados = [...produtos]
        } else {
    for (let i = 0;i < produtos.length;i++) {
        if (produtos[i].nome.toLowerCase().includes(pesqui)) {
            buscados.push(produtos[i])
        } 

        }
        if (buscados.length === 0) {
            alert("Nenhum produto encontrado!")
        }
    }
    renderizarTela()
}

// essa e uma funçao de renderizar tela
function renderizarTela() {
    let lista;

    if (filtrar.length > 0) {
        lista = filtrar;  //Tem filtro => mostra filtrados
    } else if (buscados.length > 0) {
        lista = buscados // Tem busca => mostra buscados
    } else {
        lista = produtos //Nenhum => mostra todos
    }

    listaproduto.innerHTML = "";

    for (let i = 0;i < lista.length;i++) {
        let li1 = document.createElement("li")
        li1.textContent = `Nome: ${lista[i].nome} Preço: ${lista[i].preco}`
        listaproduto.appendChild(li1)

        let botaomais = document.createElement("button")
        let botaofavorito = document.createElement("button")
        botaomais.textContent = "➕"
        botaofavorito.textContent = "💖"
        botaomais.addEventListener("click", function() {
            adicionarCarrinho(lista[i].id)
            salvarLocalStorage()
            renderizarTela()
        })
        botaofavorito.addEventListener("click", function() {
            favoritos(lista[i].id)
        })
        li1.appendChild(botaomais)
        li1.appendChild(botaofavorito)
    }
}
// funçao categoria 
function filtrarCategoria() {
    let filtrarCatego = categoria.value
   const baseParaFiltrar =  buscados.length > 0 ? buscados : produtos

   filtrar = [];

    for (let i = 0;i < baseParaFiltrar.length;i++) {
        if (baseParaFiltrar[i].categoria === filtrarCatego) {
            filtrar.push(baseParaFiltrar[i])
        }
    }
    salvarLocalStorage()
    renderizarTela()
}
function ordenaTela(){
    let pegaValorOderna = Ordenar.value

    let listaOrdenar;

    if (filtrar.length > 0) {
        listaOrdenar = filtrar;
    } else if (buscados.length > 0) {
        listaOrdenar = buscados;
    } else {
        listaOrdenar = produtos;
    }

    let listacopia = [...listaOrdenar]

    if (pegaValorOderna === "menor") {
        listacopia.sort((a,b) => a.preco - b.preco)
    } else if (pegaValorOderna === "Maior") {
        listacopia.sort((a, b) => b.preco - a.preco)
    } else {
        listacopia.sort((a, b) => a.nome.localeCompare(b.nome))
    }
    salvarLocalStorage()
    renderizarListaOrdenada(listacopia)
}
// copiei essa parte 
function renderizarListaOrdenada(lista) {
    listaproduto.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        let li1 = document.createElement("li")
        li1.textContent = `Nome: ${lista[i].nome} Preço: ${lista[i].preco}`

        let botaomais = document.createElement("button")
        let botaofavorito = document.createElement("button")

        botaomais.textContent = "➕"
        botaofavorito.textContent = "💖"

        botaomais.addEventListener("click", function() {
            adicionarCarrinho(lista[i].id)
        })

        botaofavorito.addEventListener("click", function() {
            favoritos(lista[i].id)
        })

        li1.appendChild(botaomais)
        li1.appendChild(botaofavorito)

        listaproduto.appendChild(li1)
    }
}
// LocalStorage
function salvarLocalStorage() {
    localStorage.setItem("e-commerce", JSON.stringify(carrinho))
    localStorage.setItem("favorito", JSON.stringify(favorito))
    localStorage.setItem("buscador", JSON.stringify(buscados))
}
// carregar localstorage
function Carregardados(){
    let carregarDados1 = localStorage.getItem("e-commerce")
    let carregarDados2 = localStorage.getItem("favorito")
    let carregarDados3 = localStorage.getItem("buscador")

    if (carregarDados1) {
        carrinho = JSON.parse(carregarDados1)
    }
    if (carregarDados2) {
        favorito = JSON.parse(carregarDados2)
    }
    if (carregarDados3) {
        buscados = JSON.parse(carregarDados3)
    }
}
Carregardados()