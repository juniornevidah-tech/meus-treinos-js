let array = []

function adicionar(){
    const input = document.getElementById("To-Do")
    const res = document.getElementById("res")
    const adc = array.push(input.value)

    const texto = localStorage.setItem("tarefa", JSON.stringify(array))
    atualizarTela()
}
function atualizarTela(){
    const res = document.getElementById("res")
    res.innerHTML = "";
     //let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    for (let i = 0;i < array.length;i++){
        const li = document.createElement("li")
        li.textContent = array[i]
        res.appendChild(li)
        let remover = document.createElement("button")
        remover.textContent = "Remover"
        remover.addEventListener("click", function(){
            array.splice(i, 1)
           let tarefasSalvar = JSON.parse(localStorage.getItem("tarefa"));
            localStorage.setItem("tarefa", JSON.stringify(array))
            atualizarTela()
        })
        li.appendChild(remover)
        
    }
}
function CarregarTarefas(){
   const dadosSalvos = localStorage.getItem("tarefa")
   if (dadosSalvos) {
    array = JSON.parse(dadosSalvos)
    atualizarTela()
   }
}
CarregarTarefas()