const input = document.querySelector('#tarefa-input');
const btnAdd = document.querySelector('#btn-add');
const tarefas = document.querySelector('.tarefas');
const btn_filtros = document.querySelectorAll('.filtro')

let listaTarefas = [];

function adicionaTarefa() {
    const tarefa = input.value.trim();
    if (tarefa !== "") {
        listaTarefas.push({
            tarefa: tarefa,
            concluida: false
        });
        mostrarNaTela(listaTarefas);
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

function mostrarNaTela(listaTarefas) {
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

function filtrarTarefas(btn, tarefas) {

    const tarefas_filtradas = []

   for (obj in tarefas) {
        if (btn.className.includes('pendentes') && tarefas[obj].concluida == false) {
            tarefas_filtradas.push(tarefas[obj])
        }
        else if (btn.className.includes('concluidas') && tarefas[obj].concluida == true) {
            tarefas_filtradas.push(tarefas[obj])
        }
        else if (btn.className.includes('todas')) {
            mostrarNaTela(listaTarefas)
            return
        }
    }
    
    mostrarNaTela(tarefas_filtradas)

}


btnAdd.addEventListener("click", adicionaTarefa);
btn_filtros.forEach((btn) => btn.addEventListener("click", () => { filtrarTarefas(btn, listaTarefas) }));

