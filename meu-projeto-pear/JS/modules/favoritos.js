// Modulo de favoritos
// Sem import de produtos.js: cada favorito já guarda o objeto completo,
// não precisa buscar de volta na lista original. Import morto removido.

const CHAVE_STORAGE = "favoritos";

export let arrayFavoritos = carregarFavoritosLocalStorage();

export function atualizarContadorFavoritos() {
    let contador = document.getElementById("contador-favoritos");
    if (contador) {
        contador.textContent = `${arrayFavoritos.length}`;
    }
}

export function removerFavorito(id) {
    let index = arrayFavoritos.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {
        arrayFavoritos.splice(index, 1);
        salvarFavoritosLocalStorage();
        renderizarFavoritos();
        atualizarContadorFavoritos();
    }
}

export function renderizarFavoritos() {
    let listaAdicionar = document.getElementById("lista-favoritos");
    if (!listaAdicionar) return;

    atualizarContadorFavoritos();
    listaAdicionar.innerHTML = "";

    if (arrayFavoritos.length === 0) {
        let mensagem = document.createElement("p");
        mensagem.textContent = "❤️ Você ainda não possui produtos favoritos.";
        listaAdicionar.appendChild(mensagem);
        return;
    }

    for (let i = 0; i < arrayFavoritos.length; i++) {
        let produto = arrayFavoritos[i];

        let article = document.createElement("article");
        let nome = document.createElement("h3");
        let img = document.createElement("img");
        let preco = document.createElement("p");
        let estoque = document.createElement("p");
        let btnAdicionar = document.createElement("button");
        let btnRemover = document.createElement("button");

        nome.textContent = produto.nome;
        img.src = produto.imagem;
        img.alt = produto.nome;
        preco.textContent = produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        estoque.textContent = `Estoque: ${produto.estoque}`;
        btnAdicionar.textContent = "Adicionar ao Carrinho";
        btnRemover.textContent = "Remover dos Favoritos";

        article.classList.add("card-favorito");
        nome.classList.add("favorito-nome");
        img.classList.add("favorito-imagem");
        preco.classList.add("favorito-preco");
        estoque.classList.add("favorito-estoque");
        btnAdicionar.classList.add("favorito-btn-adicionar");
        btnRemover.classList.add("favorito-btn-remover");

        article.appendChild(img);
        article.appendChild(nome);
        article.appendChild(preco);
        article.appendChild(estoque);
        article.appendChild(btnAdicionar);
        article.appendChild(btnRemover);
        listaAdicionar.appendChild(article);

        btnRemover.addEventListener("click", function () {
            removerFavorito(produto.id);
        });

        // Import dinâmico pra evitar ciclo estático favoritos.js <-> carrinho.js.
        // Isso resolve o problema sem criar dependência circular no topo do arquivo.
        btnAdicionar.addEventListener("click", async function () {
            try {
                const { adicionarAoCarrinho } = await import("./carrinho.js");
                adicionarAoCarrinho(produto);
            } catch (error) {
                console.error("Falha ao carregar carrinho.js:", error);
                alert("Não foi possível adicionar ao carrinho. Tente novamente.");
            }
        });
    }
}

export function adicionarFavorito(produto, botao) {
    let index = arrayFavoritos.findIndex(item => String(item.id) === String(produto.id));
    if (index === -1) {
        arrayFavoritos.push(produto);
        botao.textContent = "Favorito ❤️";
        botao.classList.add("ativo");
    } else {
        arrayFavoritos.splice(index, 1);
        botao.textContent = "Favorito 🤍";
        botao.classList.remove("ativo");
    }
    salvarFavoritosLocalStorage();
    atualizarContadorFavoritos();
    renderizarFavoritos();
}

function salvarFavoritosLocalStorage() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(arrayFavoritos));
    } catch (error) {
        console.error("Erro ao salvar favoritos no localStorage:", error);
    }
}

function carregarFavoritosLocalStorage() {
    try {
        let salvos = localStorage.getItem(CHAVE_STORAGE);
        let dados = salvos ? JSON.parse(salvos) : [];
        return Array.isArray(dados) ? dados : [];
    } catch (error) {
        console.error("Erro ao carregar favoritos do localStorage:", error);
        return [];
    }
}
atualizarContadorFavoritos();
renderizarFavoritos();