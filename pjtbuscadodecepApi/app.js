const campoCep = document.getElementById('cep');

// Selecionando os novos campos que vao receber o endereço
const campoLogradouro = document.getElementById('logradouro');
const campoBairro = document.getElementById('bairro');
const campoCidade = document.getElementById('cidade');
const campoEstado = document.getElementById('estado');


campoCep.addEventListener("input", async (evento) => {

    const cep = campoCep.value;
    if (cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        // Mandando as informaçoes da Api direto para os inputs da tela!
        campoLogradouro.value = dados.logradouro;
        campoBairro.value = dados.bairro;
        campoCidade.value = dados.localidade; // Na API do ViaCep, cidade se chama 'localidade'
        campoEstado.value = dados.uf; // Na API, o estado vem como 'uf'

        //Foco automatico no campo Numero para o usuario continuar digitando
        document.getElementById('numero').focus();
    } catch (erro) {
        console.error("Ih, deu erro na busca:", erro);
        alert("Erro ao buscar o CEP. Tente novamente!");
    }
  }
})