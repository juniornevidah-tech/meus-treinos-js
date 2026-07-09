import { produtos, renderizarProdutos } from "./produtos.js";

const ordenar = document.getElementById("ordenar")

function ordenarProdutos() {
    const pegaValor = ordenar.value
    let copia = [...produtos]
    if (pegaValor === "menorPreco") {
        copia.sort((produto1, produto2) => produto1.preco - produto2.preco);
    } else if (pegaValor === "maiorPreco") {
        copia.sort((a, b) => b.preco - a.preco);
    } else if (pegaValor === "a-z") {
        copia.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (pegaValor === "z-a"){
        copia.sort((a, b) => b.nome.localeCompare(a.nome));
    }
    renderizarProdutos(copia)
}

ordenar.addEventListener("change", ordenarProdutos);