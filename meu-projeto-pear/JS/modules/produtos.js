import { adicionarAoCarrinho } from "./carrinho.js";
import { adicionarFavorito, arrayFavoritos } from "./favoritos.js";

// Card
export let produtos = [
    {
        id: 1,
        nome: "iPhone 16 Pro",
        preco: 8999,
        categoria: "Celular",
        imagem: "fotos/produto_1.png",
        avaliacao: "⭐⭐⭐⭐⭐",
        descricao: "Smartphone Da Apple Um celular Muito Resistente a agua, feito de carbono...",
        estoque: 10
    },
    {
        id: 2,
        nome: "PlayStation 5",
        preco: 4500,
        categoria: "Console",
        imagem: "fotos/produto_2.png",
        avaliacao: "⭐⭐⭐⭐⭐",
        descricao: "Console Da Sony",
        estoque: 0
    },
    {
        id: 3,
        nome: "Xbox Series X",
        preco: 5000,
        categoria: "Console",
        imagem: "fotos/produto_3.png",
        avaliacao: "⭐⭐⭐⭐⭐",
        descricao: "Console da Xbox...",
        estoque: 5
    },
    {
        id: 4,
        nome: "Samsung Galaxy S25",
        preco: 8000,
        categoria: "Celular",
        imagem: "fotos/produto_4-1.png",
        avaliacao: "⭐⭐⭐⭐⭐",
        descricao: "Celular feito Pela Samsung",
        estoque: 30
    }
];

// NÃO exportado: é referência de DOM de UMA página específica.
let listaCard = document.getElementById("lista-produtos");

export function criarCard(produto) {
    let article = document.createElement("article");
    let img = document.createElement("img");
    let h3 = document.createElement("h3");
    let pPreco = document.createElement("p");
    let pDescricao = document.createElement("p");
    let btnCarrinho = document.createElement("button");
    let btnFavorito = document.createElement("button");
    let btnSaibaMais = document.createElement("button");
    let divAvaliacao = document.createElement("div");
    let divAcoes = document.createElement("div");
    let divSaibaMais = document.createElement("div");
    let pParcelamento = document.createElement("p");
    let precoD = produto.preco;
    let dividirP = (precoD / 12).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    let pEstoque = document.createElement("p");

    img.src = produto.imagem;
    img.alt = produto.nome;
    h3.textContent = produto.nome;
    divAvaliacao.textContent = produto.avaliacao;
    pPreco.textContent = produto.preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    pParcelamento.textContent = `12x de ${dividirP} sem juros`;
    pDescricao.textContent = produto.descricao;
    btnCarrinho.textContent = "Carrinho";
    btnSaibaMais.textContent = "Saiba Mais";

    let jaFavoritado = arrayFavoritos.some(f => f.id === produto.id);
    btnFavorito.textContent = jaFavoritado ? "Favorito ❤️" : "Favorito 🤍";
    if (jaFavoritado) btnFavorito.classList.add("ativo");

    article.classList.add("card-produto");
    img.classList.add("produto-imagem");
    h3.classList.add("produto-nome");
    pPreco.classList.add("produto-preco");
    pDescricao.classList.add("produto-descricao");
    divAvaliacao.classList.add("avaliacao-produto");
    divAcoes.classList.add("acoes-produto");
    btnCarrinho.classList.add("btn-carrinho");
    btnFavorito.classList.add("btn-favorito");
    btnSaibaMais.classList.add("btn-saiba-mais");
    divSaibaMais.classList.add("saiba-mais");
    pParcelamento.classList.add("produto-parcelamento");
    pEstoque.classList.add("produtos-estoque");

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(divAvaliacao);
    article.appendChild(pPreco);
    article.appendChild(pParcelamento);
    article.appendChild(pEstoque);
    article.appendChild(pDescricao);
    divAcoes.appendChild(btnCarrinho);
    divAcoes.appendChild(btnFavorito);
    divSaibaMais.appendChild(btnSaibaMais);
    article.appendChild(divAcoes);
    article.appendChild(divSaibaMais);
    listaCard.appendChild(article);

    if (produto.estoque > 10) {
        pEstoque.textContent = `📦 Em Estoque`;
        pEstoque.classList.add("em-estoque");
    } else if (produto.estoque > 0) {
        pEstoque.textContent = `⚠️ Restam apenas ${produto.estoque} unidades`;
        pEstoque.classList.add("ultimo-estoque");
    } else {
        pEstoque.textContent = `❌ Produto esgotado`;
        pEstoque.classList.add("esgotado");
    }

    btnFavorito.addEventListener("click", function () {
        adicionarFavorito(produto, btnFavorito);
    });

    btnCarrinho.addEventListener("click", function () {
        adicionarAoCarrinho(produto);
    });

    btnSaibaMais.addEventListener("click", function () {
        console.log("Saiba Mais clicado — comportamento ainda não definido:", produto.nome);
    });
}

if (listaCard) {
    produtos.forEach(function (produto) {
        criarCard(produto);
    });
}

export function renderizarProdutos(lista) {
    if (!listaCard) {
        console.error("Elemento 'lista-produtos' não encontrado nesta página.");
        return;
    }
    listaCard.innerHTML = "";

    if (lista.length === 0) {
        let mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum produto encontrado com esses filtros.";
        listaCard.appendChild(mensagem);
        return;
    }

    lista.forEach(produto => {
        criarCard(produto);
    });
}
