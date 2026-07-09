//JS/modules/modal.js

// Importamos a nossa ferramenta de formatar moeda do arquivo utils que revisamos, GEMINI QUE DISSE!
import { formatarMoeda } from "./utils.js";

// *Abre o modal e preenche com as informaçoes detalhadas do produto
// @param {Object} produto - Objeto contendo os dados do produto clicado

export function abrirModal(produto) {
    const modal = document.getElementById("modal-saiba-mais")
    const containerDetalhes = document.getElementById("modal-detalhes-produto");
    if (!modal || !containerDetalhes) return;
    // Injetamos o conteudo HTML customizado com as informaçoes do produto
    containerDetalhes.innerHTML =`
    <div class="modal-detalhes">
            <img src="${produto.imagem || 'fotos/placeholder.png'}" alt="${produto.nome}">
            <h2>${produto.nome}</h2>
            <p class="modal-preco">${formatarMoeda(produto.preco)}</p>
            <p>${produto.descricao || 'Este produto premium traz a maxima tecnologia e perfomance para o seu dia a dia, com o design minimalista e elegante que voce ja conhence.'}</p>
        </div> `
    // Mudamos o CSS de "none" para "flex" para o modal brotar na tela com o efeito de vidro fosco
    modal.style.display = 'flex';
}
/**
 * Fecha o modal limpando o seu conteudo
 */
export function fecharModal() {
    const modal = document.getElementById('modal-saiba-mais');
    if (modal) {
        modal.style.display = "none";
    }
}

// Configura os ouvintes de clique para fechar modal (no X ou clicando fora dele)
    const botaoFechar = document.querySelector('.fechar-modal');
    const modal = document.getElementById('modal-saiba-mais');

    // Fechar ao clicar no botao (X)
    if (botaoFechar) {
        botaoFechar.addEventListener('click', fecharModal);
    }

    // Fecha se o usuario clica na area escura/borrada fora da caixa branca
    if (modal) {
        modal.addEventListener("click", (evento) => {
            if (evento.target == modal) {
                fecharModal();
            }
        })
    }
 