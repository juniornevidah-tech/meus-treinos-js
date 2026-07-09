let inputnome = document.getElementById("nome")
let inputEmail = document.getElementById("Email")
let inputSenha = document.getElementById("Senha")
let inputEmailprin = document.getElementById("Emailprin")
let inputSenhaprin = document.getElementById("Senhaprin")
let botaoCadastrar = document.getElementById("Cadastrar")
let usuarioscompleto = []
let escondidodiv = document.querySelector(".Escondido")
let esconder = document.querySelector(".Escondeinformaçoes")
botaoCadastrar.addEventListener("click", function(){
    let nome = inputnome.value
    let email = inputEmail.value
    let senha = inputSenha.value
    if (nome === "") {
        alert("Digite seu nome por favor!")
        return;
    } else if (email === "") {
        alert("Digite um email, se nao, nao poderei contiua!")
        return;
    } else if (senha === "") {
        alert("Digite uma algo por favor!")
        return;
    }   
    let usuario = {
        nome1: nome,
        email1: email,
        senha1: senha
    }
    for (let i = 0;i < usuarioscompleto.length;i++) {
        if (usuarioscompleto[i].email1 === email) {
            alert("Este email ja ta cadastrado!")
            return;
        }
    }
    usuarioscompleto.push(usuario)
    SalvaDados()
    document.getElementById("nome").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("Senha").value = "";
})

function AreaDeLogin(){
    escondidodiv.classList.remove("Escondido")
}

function OutraAreadeLogin() {
        let EmailDeLogin = inputEmailprin.value
    let SenhaDeLogin = inputSenhaprin.value
    let pessoas = document.getElementById("pessoas")
    let ola = document.getElementById("ola")
    for (let i = 0;i < usuarioscompleto.length;i++) {
        if (usuarioscompleto[i].email1 === EmailDeLogin && usuarioscompleto[i].senha1 === SenhaDeLogin) {
            ola.innerText = `Seja bem vindo ${usuarioscompleto[i].nome1}`
            esconder.classList.remove("Escondeinformaçoes")
            return;
        }
    }
    alert("Email ou senha inavlida!")
}

















































function SalvaDados(){
    let salvarDados = localStorage.setItem("Login", JSON.stringify(usuarioscompleto))
}

function CarregarDados(){
    let carregarDados = localStorage.getItem("Login")

    if (carregarDados) {
        usuarioscompleto = JSON.parse(carregarDados)

    }
}
CarregarDados()