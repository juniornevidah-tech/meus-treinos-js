function PegarInformaçoes(){
    let input = document.getElementById("email").value 
    let input2 = document.getElementById("senha").value 
    let res = document.getElementById("res")

    let email1 = "Betinha23"
    let senha1 = "Sobranada23"

    if (email1 === input && senha1 === input2) {
        res.innerHTML = "Login realiazado com sucesso"
        res.style.color = "green";
    } else {
        res.innerHTML = "Usuario ou senha incorretos"
        res.style.color = "red";
    }
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";

    res.innerHTML += ` Seu Usuario ${email1}`
}