// JS/modules/login.js

    const formCadastro = document.getElementById("form-cadastro");
    const formLogin = document.getElementById("form-login");

    //===================================================
    // 1. CEREBRO DO CADASTRO (CRIAR ID PEAR)
    //===================================================

    if (formCadastro) {
        formCadastro.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Impede o formulario de recarregar a pagina
            
            // Captura os textos que o usuario digitou nos campos
            const nome = document.getElementById("cad-nome").value.trim();
            const email = document.getElementById("cad-email").value.trim().toLowerCase();
            const senha = document.getElementById("cad-senha").value;

            // Validaçao de segurança basica para a senha
            if (senha.length < 6) {
            alert("A senha precisa ter no minimo 6 caracteres.");
            return;
            }

            // Pega a lista de usuario que ja se cadastram antes (ou cria uma vazia se for o primeiro)
            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Verifica se o e-mail digitado ja pertence a alguem
            const emailExiste = usuariosCadastrados.some(usuario => usuario.email === email);

            if (emailExiste) {
                alert("Este e-mail ja esta associado a um ID Pear.");
                return;
            }

            //Se o e-mail for inedito, criamos o objeto com os dados do novo usuario
            const novoUsuario = { nome, email, senha };

            //Empurramos esse novo usuario para dentro da lista existente
            usuariosCadastrados.push(novoUsuario);

            // Gravamos a lista atualizada de volta na memoria do computador
            localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

            alert(`Conta criada com succeso, ${nome}! Seu ID Pear ja esta ativo`);
            formCadastro.reset(); // Limpa os campos do formulario de cadastro
        });
    }

    // ==================================================
    // 2. CEREBRO DO LOGIN (INICIAR SESSAO)
    // ==================================================
    if (formLogin) {
        formLogin.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Impede o recarregamento

            // Captura o e-mail e senha que o usuario colocou para tentar entrar
            const email = document.getElementById("login-email").value.trim().toLowerCase();
            const senha = document.getElementById("login-senha").value;

            // Pegar a lista de usuario cadastrados no computador
            const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios")) || [];

            // Procura se existe algum usuario que tenha exatamente aquele e-mail E aquela senha
            const usuarioValido = usuariosCadastrados.find(u => u.email === email && u.senha === senha);

            if (!usuarioValido) {
                alert("E-mail ou senha incorretos. Verifique suas credencias da Pear.");
                return;
            }

            //Se achou, salva no "usuarioLogado" para o site inteiro saber quem esta mexendo nele agora
            localStorage.setItem("usuarioLogado", JSON.stringify({nome: usuarioValido.nome, email: usuarioValido.email}));

            alert(`Bem vindo de volta, ${usuarioValido.nome}!`);

            // Manda o usuario de volta para a home (pagina Inicial ) ja logado!
            window.location.href = "index.html";
        })
    }