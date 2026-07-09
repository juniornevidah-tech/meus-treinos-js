//Formata um numero para a moeda Real Brasileiro (0,00)
//param {number} valor - O numero a ser formatado
//returns {string} Valor formatado em string

export function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: "currency",
        currency: "BRL"
    });
}

// Busca dados do localStorage de forma segura, retornando um array vazio se nao existir
// param {string} chave - A chave do LocalStorage
// returns {Array} O array recuperado ou vazio
export function obterDoStorage(chave) {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
}

export function salvarNoLocalStorage(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}