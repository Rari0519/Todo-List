<<<<<<< HEAD
const input = document.querySelector('#tarefa-input');
const btnAdd = document.querySelector('#btn-add');
const tarefas = document.querySelector('.tarefas');
const btnTodos = document.querySelector('.btn-todas');
const btnConcluidas = document.querySelector('.btn-concluidas');
const btnPendentes = document.querySelector('.btn-pendentes')
let listaTarefas = [];

function adicionaTarefa() {
    const tarefa = input.value.trim();
    if (tarefa !== "") {
        listaTarefas.push({
            tarefa: tarefa,
            concluida: false
        });
        mostrarNaTela();
    }
    input.value = '';
}

function deletar(posicao) {
    listaTarefas.splice(posicao, 1);
    mostrarNaTela();
}

function editar(posicao) {
    const novaTarefa = prompt("Edite a tarefa...");
    if (novaTarefa !== null && novaTarefa.trim() !== "") {
        listaTarefas[posicao].tarefa = novaTarefa.trim();
        mostrarNaTela();
    }
}

function concluir(posicao) {
}

function mostrarNaTela() {
    let li = "";

    listaTarefas.forEach((itemTarefa, posicao) => {
        const classeFeito = itemTarefa.concluida ? 'feito' : '';
        
        li += `
       <li class="list-group-item d-flex justify-content-between align-items-center ${classeFeito}">
        <div class="form-check">
            <label class="form-check-label" for="input">${itemTarefa.tarefa}</label>
        </div>
        <div class="ms-auto p-1">
            <button type="button" class="btn btn-success btn-sm" onclick="concluir(${posicao})"><i class='bx bx-check'></i></button>
            <button type="button" class="btn btn-primary btn-sm me-2" onclick="editar(${posicao})"><i class='bx bxs-pencil'></i></button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deletar(${posicao})"><i class='bx bx-x'></i></button>
        </div>
        </li>`;
    });

    tarefas.innerHTML = li;
}


btnAdd.addEventListener("click", adicionaTarefa);
=======

const input = document.querySelector('#input');
const btnAdd = document.querySelector('.add');
const tarefas = document.querySelector('.lista-tarefas');

let listaDeTarefas = [];

//função de pegar o valor do input
function adicionaTarefa(){
    listaDeTarefas.push(input.value); //push adiciona item na array 
    mostraTarefaTela();
}
function mostraTarefaTela(){
    let novaTarefa = ''

    listaDeTarefas.forEach((tafera) => {
        //tarefa que ja estava mais a nova 
        novaTarefa = novaTarefa + `
        <li>
        <span>${tafera}</span>
            <div class="tarefas">
                <button class="concluido">✓</button>
                <button class="editar"><i class='bx bxs-edit'></i></button>
                <button class="deletar">✗</button>
            </div>
        </li>
        `
    });

    tarefas.innerHTML = novaTarefa //inserindo a tarefa visualmente no html
}



//eventos de click
btnAdd.addEventListener("click", adicionaTarefa);

>>>>>>> parent of 24af2a5 (refiz a função de adicionar mais organizada)
