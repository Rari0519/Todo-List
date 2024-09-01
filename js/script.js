
const input = document.querySelector('#tarefa-input');
const select = document.querySelector('#form-priority');
const btnAdd = document.querySelector('#btn-add');
const tarefas = document.querySelector('#todo-list');
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
        
            <div class="list done">
                <h3>${itemTarefa.tarefa}</h3>
                <div class="list-priority">
                </div>
                <!-- Botões check, edit e complete -->
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>`;
    });

    tarefas.innerHTML = li;
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

function pesquisar(lista) {
    const input = document.querySelector('#search-input')
    input.addEventListener('input', () => {

        const valor_digitado = input.value.toLowerCase()
        const listaPesquisa = []

        for (obj in lista) {
            const nome = lista[obj].tarefa.toLowerCase()
            const tamanho = valor_digitado.length 
            const palavra_filtrada = nome.substring(0, tamanho) 
            console.log(palavra_filtrada, valor_digitado)
            if (palavra_filtrada == valor_digitado)   {
                listaPesquisa.push(lista[obj])
            }
            mostrarNaTela(listaPesquisa)
        }
    })
}

filtrar(listaTeste)
pesquisar(listaTeste)