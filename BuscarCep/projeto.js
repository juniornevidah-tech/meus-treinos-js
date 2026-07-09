let botao = document.getElementById("buscar");
botao.addEventListener("click", function(){
    let input = document.getElementById("cep").value;
    let apenasNumeros = input.replace(/\D/g, "");
    if (apenasNumeros.length !== 8) {
        alert("Digite um cep valido")
        return;
    }
    let resultado = fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`)
    let mostrar1 = resultado.then(function(resposta){
        return resposta.json()
   })
   let mostrar = mostrar1.then(function(dados){
    let logradouro = document.getElementById("Logradouro")
    let bairro = document.getElementById("Bairro")
    let complemento = document.getElementById("Complemento")
    let uf = document.getElementById("Estado")
    logradouro.textContent = `Logradouro: ${dados.logradouro}`
    bairro.textContent = `Bairro: ${dados.bairro}`
    complemento.textContent = `Complemento: ${dados.complemento}`
    uf.textContent = `UF: ${dados.uf}`
   })
})
function validarCep(cep){
    let input = document.getElementById("cep").value;
    let apenasNumeros = input.replace(/\D/g, "");
}