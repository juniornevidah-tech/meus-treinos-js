// Import de produtos.js removido: não era usado, e criava ciclo
// produtos.js -> carrinho.js -> produtos.js sem necessidade nenhuma.

const CHAVE_STORAGE = "carrinho";

export let arrayCarrinho = carregarCarrinhoLocalStorage();

export function adicionarAoCarrinho(produto) {
    if (!produto || !produto.id || typeof produto.preco !== "number" || isNaN(produto.preco) || produto.preco <= 0) {
        console.error("Produto inválido:", produto);
        return;
    }

    let estoque = produto.estoque || 0;
    let produtoExistente = arrayCarrinho.find(item => String(item.id) === String(produto.id));

    if (produtoExistente) {
        produtoExistente.estoque = estoque; // resincroniza snapshot com o valor ao vivo
        if (produtoExistente.quantidade >= estoque) {
            alert("Quantidade máxima em estoque atingida.");
            return;
        }
        produtoExistente.quantidade++;
    } else {
        if (estoque <= 0) {
            alert("Produto sem estoque.");
            return;
        }
        arrayCarrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1,
            estoque: estoque
        });
    }

    salvarCarrinhoLocalStorage();
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

export function removerDoCarrinho(produtoId) {
    let index = arrayCarrinho.findIndex(item => String(item.id) === String(produtoId));
    if (index !== -1) {
        arrayCarrinho.splice(index, 1);
    } else {
        console.error(`Produto com Id ${produtoId} não encontrado no carrinho.`);
    }
    salvarCarrinhoLocalStorage();
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

export function renderizarCarrinho() {
    let listaCarrinho = document.getElementById("lista-carrinho");
    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    if (arrayCarrinho.length === 0) {
        let mensagem = document.createElement("p");
        mensagem.textContent = "🛒 Seu carrinho está vazio.";
        listaCarrinho.appendChild(mensagem);
        atualizarTotalCarrinho();
        return;
    }

    arrayCarrinho.forEach(produto => {
        let article = document.createElement("article");
        let img = document.createElement("img");
        let nome = document.createElement("h3");
        let preco = document.createElement("p");
        let quantidade = document.createElement("p");
        let mais = document.createElement("button");
        let menos = document.createElement("button");
        let subTotal = document.createElement("p");
        let btnRemover = document.createElement("button");
        let subTotalValor = produto.preco * produto.quantidade;

        img.src = produto.imagem;
        img.alt = produto.nome;
        nome.textContent = produto.nome;
        preco.textContent = produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
        quantidade.textContent = `Quantidade: ${produto.quantidade}`;
        mais.textContent = "+";
        menos.textContent = "-";
        mais.setAttribute("aria-label", "Aumentar quantidade");
        menos.setAttribute("aria-label", "Diminuir quantidade");
        subTotal.textContent = `Subtotal: ${subTotalValor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`;
        btnRemover.textContent = "Excluir";

        article.classList.add("card-carrinho");
        nome.classList.add("carrinho-nome");
        btnRemover.classList.add("carrinho-btn-remover");
        preco.classList.add("carrinho-preco");
        quantidade.classList.add("carrinho-quantidade");
        mais.classList.add("carrinho-btn-mais");
        menos.classList.add("carrinho-btn-menos");
        img.classList.add("carrinho-imagem");
        subTotal.classList.add("carrinho-subtotal");

        article.appendChild(img);
        article.appendChild(nome);
        article.appendChild(preco);
        article.appendChild(quantidade);
        article.appendChild(mais);
        article.appendChild(menos);
        article.appendChild(subTotal);
        article.appendChild(btnRemover);
        listaCarrinho.appendChild(article);

        mais.addEventListener("click", function () {
            if (produto.quantidade < produto.estoque) {
                produto.quantidade++;
                salvarCarrinhoLocalStorage();
                atualizarContadorCarrinho();
                renderizarCarrinho();
            } else {
                alert("Quantidade máxima em estoque atingida.");
            }
        });

        menos.addEventListener("click", function () {
            if (produto.quantidade > 1) {
                produto.quantidade--;
                salvarCarrinhoLocalStorage();
                atualizarContadorCarrinho();
                renderizarCarrinho();
            } else {
                removerDoCarrinho(produto.id);
            }
        });

        btnRemover.addEventListener("click", function () {
            removerDoCarrinho(produto.id);
        });
    });

    atualizarTotalCarrinho();
}

export function atualizarContadorCarrinho() {
    let contadorCarrinho = document.getElementById("contador-carrinho");
    if (!contadorCarrinho) return;
    contadorCarrinho.textContent = arrayCarrinho.reduce((acc, p) => acc + p.quantidade, 0);
}

export function calcularTotalCarrinho() {
    return arrayCarrinho.reduce((acc, produto) => acc + (produto.preco * produto.quantidade), 0);
}

export function atualizarTotalCarrinho() {
    let totalCarrinho = document.getElementById("total-carrinho");
    if (totalCarrinho) {
        totalCarrinho.textContent = calcularTotalCarrinho().toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }
}

function salvarCarrinhoLocalStorage() {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(arrayCarrinho));
    } catch (error) {
        console.error("Erro ao salvar o carrinho no localStorage:", error);
    }
}

function carregarCarrinhoLocalStorage() {
    try {
        let salvo = localStorage.getItem(CHAVE_STORAGE);
        let dados = salvo ? JSON.parse(salvo) : [];
        return Array.isArray(dados) ? dados : [];
    } catch (error) {
        console.error("Erro ao carregar o carrinho do localStorage:", error);
        return [];
    }
}

atualizarContadorCarrinho();
atualizarTotalCarrinho();
renderizarCarrinho();