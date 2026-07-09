let transacoes0 = []
let totalentradas = document.getElementById("tra")
    let totalDespesa = document.getElementById("tds")
    let Saldo = document.getElementById("slf")
let contador = 1
function continuar(){
    let input = document.getElementById("Descriçao").value
    let inputnumber = Number(document.getElementById("Transaçao").value)
    let selectED = document.getElementById("despesa").value
    let selectCa = document.getElementById("categoria").value
    let lista1 = document.getElementById("lista1")
    if (input === "") {
        alert("Digite algo")
        return false;
    }
    if (isNaN(inputnumber) || inputnumber <= 0) {
        alert("Digite um numero!")
        return false
    }
    let transaçao1 = {
        id: contador,
        descriçao:"",
        valor: 0,
        tipo: "",
        categoria: "",
        data: ""
    }
    contador++

    transaçao1.descriçao = input
    transaçao1.valor = inputnumber
    transaçao1.tipo = selectED
    transaçao1.categoria = selectCa
    transacoes0.push(transaçao1)
    document.getElementById("Transaçao").value = ""
    document.getElementById("Descriçao").value = "";
    salvarLocalStorage()
    atualizarTela()
    calcularSaldo()
}
function removerTransacoes(id){
    let index = transacoes0.findIndex(item => item.id === id)
    transacoes0.splice(index, 1)
    salvarLocalStorage()
    atualizarTela()
    calcularSaldo()

}

function atualizarTela(){
    let lista = document.getElementById("lista1")
    let valor = document.getElementById("valor")

    lista.innerHTML = "";

    for (let i = 0;i < transacoes0.length;i++){
        let li = document.createElement("li")
        li.textContent = `Descriçao:${transacoes0[i].descriçao} Valor:${transacoes0[i].valor} tipo:${transacoes0[i].tipo}
        categoria:${transacoes0[i].categoria}`

        lista.appendChild(li)
    }
}
function calcularSaldo(){
    let totalentradas1 = 0
    let totalDespesa1 = 0
    let Saldo1 = 0



    for (let i = 0;i < transacoes0.length;i++){
        let tte = transacoes0[i].valor
        if (transacoes0[i].tipo === "entrada") {
            totalentradas1 += tte
        } else if (transacoes0[i].tipo === "despesa") {
            totalDespesa1 += tte  
        } 
    }
    totalentradas.innerHTML = `Entrada:${totalentradas1}`
    totalDespesa.innerHTML = `Despesa:${totalDespesa1}`
    Saldo1 = totalentradas1 - totalDespesa1
    Saldo.innerHTML = `Resultado:${Saldo1}`
}
function salvarLocalStorage(){
    let salvar = localStorage.setItem("gerenciador", JSON.stringify(transacoes0))
}
function carregarLocalStorage(){
    let carregar = localStorage.getItem("gerenciador")
    if (carregar) {
        transacoes0 = JSON.parse(carregar)
        atualizarTela()
    }
}
carregarLocalStorage()