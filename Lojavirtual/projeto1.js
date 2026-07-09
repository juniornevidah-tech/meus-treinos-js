let carrinho = []
let botao = document.getElementById("botao")
let carrinhodiv = document.querySelector(".escondido")
function Comprar(){
     carrinho.push({
        nome: "Bmw m4 competition",
        valor: 90000000
     })
     botao.textContent = carrinho.length
     AtualizarCarrinho()
}
function Comprar1(){
     carrinho.push({
        nome: "Porsche 911",
        valor: 100000000
     })
     botao.textContent = carrinho.length
     AtualizarCarrinho()
}
function Comprar2(){
     carrinho.push({
        nome: "Ferrari purosangue",
        valor: 68385000
     })
     botao.textContent = carrinho.length
     AtualizarCarrinho()
}
botao.addEventListener("click", function(){
    let lista = document.getElementById("lista")
    let RemoveProduto = document.getElementById("remove")
    let total = document.getElementById("total")
    lista.innerHTML = "";
    let soma = 0
    for (let i = 0;i < carrinho.length;i++) {
        let Elementos = document.createElement("li")
        Elementos.textContent = `Nome: ${carrinho[i].nome} Valor:R$${carrinho[i].valor}`

        lista.appendChild(Elementos)
        soma += carrinho[i].valor
        let RemoveOne = document.createElement("button")

        RemoveOne.textContent = "Apagar"
        
        RemoveOne.addEventListener("click", function(){
         carrinho.splice(i, 1)
         AtualizarCarrinho()
        })
        Elementos.appendChild(RemoveOne)
    }
    total.innerHTML = `Total: ${soma}`
    carrinhodiv.classList.remove("escondido")
})
let finaliza = document.getElementById("finaliza")


finaliza.addEventListener("click", function(){
   let ultimacompra = document.getElementById("compra")
   carrinho.length = 0 
   AtualizarCarrinho()
   ultimacompra.innerHTML = "Finalizado com Sucesso!"
})
function AtualizarCarrinho(){
const lista = document.getElementById("lista")
let total = document.getElementById("total")
lista.innerHTML = "";
let soma = 0
for (let i = 0;i < carrinho.length;i++) {
   let Elemento = document.createElement("li")
   Elemento.textContent = `Nome: ${carrinho[i].nome} Valor: ${carrinho[i].valor}`
   lista.appendChild(Elemento)
   soma += carrinho[i].valor
}
total.innerHTML = ` Total: ${soma}`
botao.textContent = carrinho.length
}