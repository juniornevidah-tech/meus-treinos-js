// variaveis globais
let pokedex = document.getElementById("id")
let nome1 = document.getElementById("nome")
let input = document.getElementById("pokemon")
let imagem = document.getElementById("imagem")
let tipo = document.getElementById("Tipo(s)")
let altura = document.getElementById("Altura")
let peso = document.getElementById("Peso")
let habilidade = document.getElementById("Habilidades")
let nomeAtual = "";
let pokemonAtual = 1;
let favoritos = [];
let botaoBuscar = document.getElementById("Buscar");
// eventos para os botoes
input.addEventListener("keydown", function(event){
    let nome = input.value.trim().toLowerCase();
    if (event.key === "Enter") {
        if (nome === "") {
            alert("Por favor, digite o nome de um poekmon!");
            return;
            } 
            document.getElementById("pokemon").value = "";
            BuscarPokemon(nome);   
        }
})
botaoBuscar.addEventListener("click", function(){
    let nome = input.value.trim().toLowerCase();
    if (nome === "") {
        alert("Por favor, digite o nome de um pokemon!");
        return;
    }
    document.getElementById("pokemon").value = "";
    BuscarPokemon(nome);
})
async function BuscarPokemon(nome) {
        imagem.innerHTML = "Carregando..."

    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    if (!resposta.ok) {
        alert("Pokemon nao encontrado!");
        return;
    }else {
    let dados = await resposta.json();
    nomeAtual = dados.name
    pokemonAtual = dados.id;
    imagem.innerHTML = `<img src="${dados.sprites.front_default}" alt="${dados.name}">`;
    pokedex.innerHTML = `Pokedex: ${dados.id}`;
    nome1.innerHTML = `Nome: ${dados.name}`;
    tipo.innerHTML = `Tipo(s): ${dados.types.map(type => type.type.name).join(", ")}`;
    altura.innerHTML = `Altura: ${dados.height / 10} m`;
    peso.innerHTML = `Peso: ${dados.weight / 10} Kg`;
    habilidade.innerHTML = `Habilidades: ${dados.abilities.map(ability => ability.ability.name).join(", ")}`;
    }

}
let botaoAleatorio = document.getElementById("Aleatorio");
botaoAleatorio.addEventListener("click", function(){
    let numero = Math.floor(Math.random()* 898) + 1;
    BuscarPokemon(numero);
});
function Proximo() {
    pokemonAtual++;
    BuscarPokemon(pokemonAtual);
}
function Anterior() {
    pokemonAtual--;
    if (pokemonAtual < 1) {
        pokemonAtual = 1;
    }
    BuscarPokemon(pokemonAtual);
}
function AdicionarFavorito() {
    let favorito = {
    id: pokemonAtual,
    name: nomeAtual
}
    for (let i = 0; i < favoritos.length;i++){
        if (favoritos[i].id === pokemonAtual) {
            alert("Voce ja tem um igual!")
            return;
        }

    }
    favoritos.push(favorito)
    SalvarDados()
    atualizarFavoritos();
}
function atualizarFavoritos() {
    let favoritosElement = document.getElementById("Favoritos");
    document.getElementById("Favoritos").innerHTML = "";
    favoritosElement.innerHTML += "<h2>⭐Favoritos</h2>";
    for (let i = 0; i < favoritos.length;i++) {
        let li = document.createElement("li");
        favoritosElement.appendChild(li);
            let botaoClick = document.createElement("button");
            botaoClick.innerHTML += `#${favoritos[i].name}`;
            li.appendChild(botaoClick);
            botaoClick.addEventListener("click", function(){
                BuscarPokemon(favoritos[i].id);
            });
            let botaoremover = document.createElement("button")
            botaoremover.textContent = "❌"
            li.appendChild(botaoremover);
            const index = i
            botaoremover.addEventListener("click", function(){
                favoritos.splice(index, 1)
                SalvarDados()
                atualizarFavoritos()
            })
    }

}
function SalvarDados(){
let salvaDados = localStorage.setItem("pokemon", JSON.stringify(favoritos))
}

function CarregarDados(){
    let carregarDados = localStorage.getItem("pokemon")

    if (carregarDados) {
        favoritos = JSON.parse(carregarDados)
        atualizarFavoritos()
    }
}
CarregarDados()