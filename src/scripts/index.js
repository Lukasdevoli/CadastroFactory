/// FUNÇÃO CRIA UM OBJETO CRIAR CADASTRO 
function createRegister(nome, email, dataNascimento, telefone){    
    return {
        nomeCompleto: nome,
        email: email,
        dataNascimento: dataNascimento,
        telefone: telefone,
        createIn: new Date().toISOString()
    }
} 
    
/// FUNÇÃO REGISTRA USUÁRIO 
let indexEdicao = null;   
function register(){
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const dataNascimento =  document.getElementById("dataNascimento").value;
    const telefone = document.getElementById("telefone").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarsenha = document.getElementById("confirmarsenha").value;

    if(senha !== confirmarsenha){
        alert("Senhas não coincidem!");
        return;
    }

    // NÃO armazenamos senhas em localStorage para segurança. Apenas efetuamos a validação local.
    let cadastro = createRegister(nome, email, dataNascimento, telefone);
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    if(indexEdicao !== null){
        cadastro.createIn = cadastros[indexEdicao].createIn;
        cadastros[indexEdicao] = cadastro;
        alert("Cadastro atualizado com sucesso");
        indexEdicao = null;
    } else {
        cadastros.push(cadastro);
        alert("Cadastro realizado com sucesso!");
    }

    localStorage.setItem("cadastros", JSON.stringify(cadastros));
    document.getElementById("formCadastro").reset();
    mostrarTelaLista();
    exibirCadastros();
} 


///FUNÇÃO EDITAR CADASTRO
function editRegister(index){
    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    const cadastro = cadastros[index];

    document.getElementById("nome").value = cadastro.nomeCompleto;
    document.getElementById("email").value = cadastro.email;
    document.getElementById("dataNascimento").value = cadastro.dataNascimento;
    document.getElementById("telefone").value = cadastro.telefone;
    // Don't pre-fill password fields for security; user must provide a new password if they want to change it
    document.getElementById("senha").value = "";
    document.getElementById("confirmarsenha").value = "";

    indexEdicao = index;
    mostrarTelaCadastro();
}


///FUNÇÃO DELETAR CADASTRO
function deleteRegister(index){
    if(confirm("Tem certeza que excluir este cadastro ?")){
        let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

        cadastros.splice(index, 1);
        localStorage.setItem("cadastros", JSON.stringify(cadastros));

        exibirCadastros();
    }
}
///FUNÇÃO EXIBIR CADASTRO
function exibirCadastros() {
    const listaContainer = document.getElementById("lista-cadastros");
    listaContainer.innerHTML = "";

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    if (cadastros.length === 0) {
        listaContainer.innerHTML = "<p>Nenhum cadastro encontrado.</p>";
        return;
    }

    cadastros.forEach((cadastro, index) => {
        const item = document.createElement("div");
        item.className = "cadastro-item";

        const info = document.createElement("div");
        info.className = "info-cadastro"

        const nome = document.createElement("p");
        const nomeStrong = document.createElement('strong');
        nomeStrong.textContent = 'Nome: ';
        nome.appendChild(nomeStrong);
        nome.appendChild(document.createTextNode(cadastro.nomeCompleto));

        const email = document.createElement("p");
        const emailStrong = document.createElement('strong');
        emailStrong.textContent = 'Email: ';
        email.appendChild(emailStrong);
        email.appendChild(document.createTextNode(cadastro.email));

        const nascimento = document.createElement("p");
        const nascStrong = document.createElement('strong');
        nascStrong.textContent = 'Data de Nascimento: ';
        nascimento.appendChild(nascStrong);
        nascimento.appendChild(document.createTextNode(cadastro.dataNascimento));

        const telefone = document.createElement("p");
        const telStrong = document.createElement('strong');
        telStrong.textContent = 'Telefone: ';
        telefone.appendChild(telStrong);
        telefone.appendChild(document.createTextNode(cadastro.telefone));

        info.append(nome, email, nascimento, telefone);

        const acoes = document.createElement("div");
        acoes.className = "acoes-cadastro";

        const btnEditar = document.createElement("button");
        btnEditar.type = 'button';
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.onclick = () => editRegister(index);

        const btnDeletar = document.createElement("button");
        btnDeletar.type = 'button';
        btnDeletar.textContent = "Deletar";
        btnDeletar.className = "btn-deletar";
        btnDeletar.onclick = () => deleteRegister(index);

        acoes.appendChild(btnEditar);
        acoes.appendChild(btnDeletar);

        item.appendChild(info);
        item.appendChild(acoes);

        listaContainer.appendChild(item);

    });
}


///FUNÇÃO EXIBIR TELA DE CADASTRO
function mostrarTelaCadastro() {
    document.getElementById("telaCadastro").style.display = "block";
    document.getElementById("telaLista").style.display = "none";
}

///FUNÇÃO MOSTRAR LISTA DE CADASTROS
function mostrarTelaLista() {
    document.getElementById("telaCadastro").style.display = "none";
    document.getElementById("telaLista").style.display = "block";
    exibirCadastros(); 
}

// Init: attach listeners safely and render existing cadastros
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formCadastro');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            register();
        });
    }
    exibirCadastros();
});

    