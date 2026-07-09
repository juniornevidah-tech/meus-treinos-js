import { produtos, renderizarProdutos } from "./produtos.js";
import { abrirModal } from "./modal.js";
// Estado compartilhado dos três controles. Nenhum dos três reseta os
// outros — cada um só atualiza sua própria fatia do estado e reaplica
// tudo junto. Isso é a diferença entre "combinar" e os três arquivos
// antigos, que cada um chamava renderizarProdutos isolado.
let estado = {
    termo: "",
    categoria: "Todos",
    ordenacao: "padrao"
};

function aplicarFiltros() {
    let resultado = [...produtos];

    // 1. Busca por texto
    if (estado.termo) {
        resultado = resultado.filter(produto =>
            produto.nome.toLowerCase().includes(estado.termo)
        );
    }

    // 2. Categoria
    if (estado.categoria !== "Todos") {
        resultado = resultado.filter(produto =>
            produto.categoria === estado.categoria
        );
    }

    // 3. Ordenação — aplicada por último, sobre o resultado já filtrado,
    // não sobre "produtos" inteiro. Essa era a falha do ordena.js antigo:
    // ordenava o array original, descartando qualquer filtro ativo.
    if (estado.ordenacao === "menorPreco") {
        resultado.sort((a, b) => a.preco - b.preco);
    } else if (estado.ordenacao === "maiorPreco") {
        resultado.sort((a, b) => b.preco - a.preco);
    } else if (estado.ordenacao === "a-z") {
        resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (estado.ordenacao === "z-a") {
        resultado.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    renderizarProdutos(resultado);
}

// ===== Busca por texto =====
const inputBuscar = document.getElementById("produto");
if (inputBuscar) {
    inputBuscar.addEventListener("input", function () {
        estado.termo = inputBuscar.value.trim().toLowerCase();
        aplicarFiltros();
    });
}

const formBusca = document.querySelector(".pesquisar");
if (formBusca) {
    formBusca.addEventListener("submit", function (event) {
        event.preventDefault();
        aplicarFiltros();
    });
}

// ===== Categoria =====
const selectCategoria = document.getElementById("categoria");
if (selectCategoria) {
    selectCategoria.addEventListener("change", function () {
        estado.categoria = selectCategoria.value;
        aplicarFiltros();
    });
}

// ===== Ordenação =====
// CORRIGIDO: faltava essa guarda no ordena.js original — sem ela,
// "ordenar" null quebrava o carregamento do módulo inteiro.
const selectOrdenar = document.getElementById("ordenar");
if (selectOrdenar) {
    selectOrdenar.addEventListener("change", function () {
        estado.ordenacao = selectOrdenar.value;
        aplicarFiltros();
    });
}

// ==== 2. CONEXAO DO CLIQUE DO MODAL (DELEGAÇAO DE EVENTOS) ====
const containerLista = document.getElementById("lista-produtos");
if (containerLista) {
    containerLista.addEventListener("click", function (evento) {
        // Verificar se o elemento clicado tem a classe do botao saiba mais
        // NOTA: Se no seu produtos.js a classe for diferente de "btn-saiba-mais", ajuste aqui!
        const botaoSaibaMais = evento.target.closest('.btn-saiba-mais') || (evento.target.tagName === 'A' && evento.target.textContent.includes('Saiba Mais'));

        if (botaoSaibaMais) {
            evento.preventDefault();

            //Procura o card do produto para descobrir qual e o ID ou Nome dele
            const cardProduto = evento.target.closest('.produto-item') || evento.target.closest('.card-produto') || evento.target.parentElement;
            const tagTitulo = cardProduto.querySelector("h3") || cardProduto.querySelector('h2');
            if (!tagTitulo) return;

            const nomeProduto = tagTitulo.textContent.trim();

            //Buscar o objeto do produto completo na nossa lista oficial
            const produtoEncontrado = produtos.find(p => p.nome === nomeProduto);

            if (produtoEncontrado) {
                // Abre o modal de verdade com os dados dele!
                abrirModal(produtoEncontrado);
            }
        }
    })
}

//Executa uma vez ao carrinho o script para mostrar a lista inicial completa
aplicarFiltros();