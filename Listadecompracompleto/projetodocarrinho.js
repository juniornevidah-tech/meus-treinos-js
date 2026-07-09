let array = []
let botao = document.getElementById("carrinho5")
let escondidodiv = document.querySelector(".escondido")
function adicionar(id){
    let Quantidade = document.getElementById("Quantidade")
    let itemEncontrado = array.find(item => item.id === Number(id))
    if (itemEncontrado) {
        Quantidade.innerHTML = itemEncontrado.quantidade += 1
        salvarCarrinho()
        AtualizarCarrinho()
    } else {
        let produtonovo = produto.find(item => item.id === Number(id))
        array.push({
            ...produtonovo
        })
    }
    botao.textContent = array.length
    salvarCarrinho()
    AtualizarCarrinho()

}
let produto = [
    {id: 1, nome: "Mouse g1", valor: 400, quantidade: 1, categoria: "perifericos"},
    {id: 2, nome: "Teclado GhostOne", valor: 300, quantidade: 1, categoria: "perifericos"},
    {id: 3, nome: "Monitor 160hz", valor: 1000, quantidade: 1, categoria: "monitores"},
    {id: 4, nome: "Placa de Video", valor: 3000, quantidade: 1, categoria: "componentes"}
]
botao.addEventListener("click", function(){
    let lista = document.getElementById("LDC")
    let valorfinal = document.getElementById("Valor")
    let Quantidade = document.getElementById("Quantidade")

    lista.innerHTML = "";
    let soma = 0

    for (let i = 0;i < array.length;i++){
        let li = document.createElement("li")
        li.textContent = `Nome:${array[i].nome} Valor:${array[i].valor} Quantidade:${array[i].quantidade}`

        lista.appendChild(li)
        soma += array[i].valor * array[i].quantidade
        let apagar = document.createElement("button")

        apagar.textContent = "apagar";
        const indexAtual = i;
        apagar.addEventListener("click", function(){
            array.splice(indexAtual, 1)
            salvarCarrinho()
            AtualizarCarrinho()
        })
        li.appendChild(apagar)
    valorfinal.innerHTML = `Total dos seus produtos:R$${soma} Reais`
    escondidodiv.classList.remove("escondido")
    }
})
function AtualizarCarrinho(){
    let lista = document.getElementById("LDC")
    let valorfinal = document.getElementById("Valor")

    lista.innerHTML = "";
    let soma = 0

    for (let i = 0;i < array.length;i++){
        let li = document.createElement("li")
        li.textContent = `Nome:${array[i].nome} Valor:${array[i].valor} Quantidade:${array[i].quantidade}`
        lista.appendChild(li)
        let apagar = document.createElement("button")
        soma += array[i].valor * array[i].quantidade
        
        apagar.textContent = "apagar"

        const indexAtual = i;
        apagar.addEventListener("click", function(){
            if (array[indexAtual].quantidade > 1) {
                array[indexAtual].quantidade -= 1
            }else {
                array.splice(indexAtual, 1)
            }
            salvarCarrinho()
            AtualizarCarrinho()
        })
        li.appendChild(apagar)
    }
    valorfinal.innerHTML = `Total dos seus produtos:R$${soma}`
    botao.textContent = array.length
}
function salvarCarrinho(){
    let lcs = localStorage.setItem("carrinho", JSON.stringify(array))
}

function CarregarCarrinho(){
    let dadosSalvo = localStorage.getItem("carrinho")

    if (dadosSalvo) {
        array = JSON.parse(dadosSalvo)
        AtualizarCarrinho()
    }
}
CarregarCarrinho()
function Buscar(){
    let input = document.getElementById("pesquise").value.toLowerCase()
    let todos = document.querySelectorAll(".produtos")
    console.log(todos.length);
    for (let i = 0;i < todos.length;i++) {
        let categorias = todos[i].dataset.categoria
        let nome = todos[i].textContent.toLowerCase()
        if (nome.includes(input)) {
            todos[i].style.display = 'block';
        }else {
            todos[i].style.display = 'none';
        }
    }
}

function filtraCategoria(categoriaEscolhida){
        let todos = document.querySelectorAll(".produtos")
    for (let i = 0;i < todos.length;i++) {
        let categorias = todos[i].dataset.categoria
        if (categorias === categoriaEscolhida){
            todos[i].style.display = 'block'
        }else {
            todos[i].style.display = 'none'
        }
    }
}
