

const input = document.querySelector('#tarefa-input');
const select = document.querySelector('#form-priority');
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
    listaTarefas[posicao].concluida = !listaTarefas[posicao].concluida;

    const label = document.querySelector(`#label-${posicao}`);

    if (listaTarefas[posicao].concluida == true) {
        label.style.textDecoration = 'line-through';
    } else{
        label.style.textDecoration = 'none';
    }
}

function mostrarNaTela(listaTarefas) {
    let li = "";
    listaTarefas.forEach((itemTarefa, posicao) => {
        li = li + `
        <li class="list-group-item d-flex justify-content-between align-items-center">
         <div class="form-check">
             <input class="form-check-input" type="checkbox" onchange="concluir(${posicao})">
             <label class="form-check-label" id="label-${posicao}" for="input">${itemTarefa.tarefa}</label>
         </div>
         <div class="ms-auto p-1">
             <button type="button" class="btn btn-primary btn-sm me-2" onclick="editar(${posicao})"><i class='bx bxs-pencil'></i></button>
             <button type="button" class="btn btn-danger btn-sm" onclick="deletar(${posicao})"><i class='bx bx-x'></i></button>
         </div>
         </li>`;
    });

    tarefas.innerHTML = li;
}

// utiliza o nome da classe e o atributo concluido para gerar um novo array com as tarefas filtradas
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


// ========== MURILO =========== //

// ARRAY DE TESTE PARA FILTRO E PESQUISA
let listaTeste = [
    { tarefa: 'Estudar matemática', concluida: false, prioridade: 'Baixa' },
    { tarefa: 'Revisar histórico', concluida: false, prioridade: 'Alta' },
    { tarefa: 'Fazer exercícios de física', concluida: false, prioridade: 'Média' },
    { tarefa: 'Ler um livro', concluida: false, prioridade: 'Baixa' },
    { tarefa: 'Escrever um relatório', concluida: false, prioridade: 'Alta' },
    { tarefa: 'Organizar a sala de estudos', concluida: false, prioridade: 'Média' },
    { tarefa: 'Comprar materiais de estudo', concluida: false, prioridade: 'Baixa' },
    { tarefa: 'Preparar apresentação', concluida: false, prioridade: 'Alta' },
    { tarefa: 'Revisar anotações', concluida: true, prioridade: 'Média' },
    { tarefa: 'Planejar a semana', concluida: false, prioridade: 'Baixa' }
];

mostrarNaTela(listaTeste)


function filtrar(lista) {
    const select = document.querySelector('#filter-select')
    select.addEventListener('input', (e) => {

        const listaFiltrada = []

        if (select.value == 'all') {
            mostrarNaTela(listaTeste)
            return
        }

        else if (select.value == 'done') {
            for (obj in lista) {
                if (lista[obj].concluida == true) {
                    listaFiltrada.push(lista[obj])
                }
            }
        }

        else if (select.value == 'todo') {
            for (obj in lista) {
                if (lista[obj].concluida == false) {
                    listaFiltrada.push(lista[obj])
                }
            }
        }

        mostrarNaTela(listaFiltrada)
 
    })
}

filtrar(listaTeste)