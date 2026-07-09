class Transacoes {
    constructor(descricao, valor, tipo, categoria, id) {
        this.descricao = descricao;
        this.valor = valor;
        this.tipo = tipo;
        this.categoria = categoria;
        this.id = id;
    }
}

class DashBoardFinanceiro {
    constructor(){
        this.transacoes = []
    }
}
let dashboard = new DashBoardFinanceiro()
function AdicionandoTransacao() {
    let inputDescricao = document.getElementById("Descriçao").value
    let inputvalor = Number(document.getElementById("Valor").value)
    let selectEntraDesp = document.getElementById("entradaoudespesa").value
    let categoria = document.getElementById("Categoria").value
    const gerarId = () => Date.now().toString();
    let novatransacao = new Transacoes(inputDescricao, inputvalor, selectEntraDesp, categoria, gerarId())
    dashboard.transacoes.push(novatransacao)
    SalvarLocalStorage()
    atualizarResumo()
    renderizaNaTela()
}

function renderizaNaTela() {
    let div = document.getElementById("DashBoard23")
    let listaul = document.getElementById("resultado")

    listaul.innerHTML = ""

    for (let i = 0;i < dashboard.transacoes.length;i++) {
        let li = document.createElement("li")
        let excluir = document.createElement("button")
        li.textContent = `Descriçao: ${dashboard.transacoes[i].descricao} Valor: ${dashboard.transacoes[i].valor} EntraouDesp: ${dashboard.transacoes[i].tipo} Categoria: ${dashboard.transacoes[i].categoria}`
        listaul.appendChild(li)

        excluir.textContent = "Excluir"
        let index = i;
        excluir.addEventListener("click", function(){
            dashboard.transacoes.splice(index, 1)
            SalvarLocalStorage()
            renderizaNaTela()
            atualizarResumo()
        })
        li.appendChild(excluir)
    }
}

function atualizarResumo() {
    let receitas = 0 
    let despesas = 0 
    let Saldo = 0
let resultadop = document.getElementById("Despesas")
let resultadoR = document.getElementById("Receitas")
let total = document.getElementById("Saldo")
    for (let i = 0;i < dashboard.transacoes.length;i++) {
        let soma = dashboard.transacoes[i].valor
        if (dashboard.transacoes[i].tipo === "Receita") {     
            receitas += soma

        } else if (dashboard.transacoes[i].tipo === "Despesa") {
            despesas += soma
        }
   
    }
    resultadop.innerHTML = `Despesas: ${despesas}`
    resultadoR.innerHTML = `Receitas: ${receitas}`
    Saldo = receitas - despesas
    total.innerHTML = `Total: ${Saldo}`

}
function remover(id){
    let index = dashboard.transacoes.findIndex(item => item.id === id)
    dashboard.transacoes.splice(index, 1)
    SalvarLocalStorage()
    atualizarResumo()
    renderizaNaTela()
}

function SalvarLocalStorage() {
    let SalvaDados = localStorage.setItem("Financeiro", JSON.stringify(dashboard.transacoes))
}

function Carregardados() {
    let CarregarDados = localStorage.getItem("Financeiro")

    if (CarregarDados) {
        dashboard.transacoes = JSON.parse(CarregarDados)
        renderizaNaTela()
    }
}
Carregardados()