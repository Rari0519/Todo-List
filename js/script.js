

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
    let label = document.querySelector(`#label-${posicao}`);
    if (label) {
        label.classList.add('feito'); // Adiciona a classe 'feito' para riscar o texto
        console.log(label);
    } else {
        console.error('Label não encontrado para a posição', posicao);
    }
}


function mostrarNaTela() {
    let li = "";
    listaTarefas.forEach((itemTarefa, posicao) => {
        li += `
       <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="form-check">
            <label class="form-check-label" id="label-${posicao} for="input">${itemTarefa.tarefa}</label>
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


