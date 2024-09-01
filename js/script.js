// ========== MURILO - RAYANE - RARIANE =========== //

// Selecionando elementos
const input = document.querySelector("#tarefa-input"); /* input */
const btnAdd = document.querySelector("#btn-add"); /* Botão add */
const ulTarefas = document.querySelector(".list-task"); /* Lista tarefas- */
const btn_filtros = document.querySelectorAll(".filtro");
const edit = document.querySelector("#edit")
const select = document.querySelector('#form-priority')

// ------------------------------------------------------------------------------


let listaTarefas = []; // definindo array para armazenar as lista de tarefas

// Funções
function adicionaTarefa() {
    const tarefa = input.value.trim();
    const prioridade = select.value;
    console.log(prioridade)
    if (tarefa !== "") {
        listaTarefas.push({
            tarefa: tarefa,
            prioridade: prioridade,
            concluida: false
        })
        mostrarNaTela(listaTarefas);
    } else alert("Não é possivel adicionar um tarefa vazia.\nPor favor insira um tarefa válida!")
    input.value = ""; /* limpando input após adicionar nova tarefa */
    select.value = 'Baixa'
}

function mostrarNaTela(lista) {
    let newLi = "";

    lista.forEach((itemTarefa, posicao) => {
        let classePrioridade = '';
        if (itemTarefa.prioridade === 'Alta') {
            classePrioridade = 'prioridade-alta';
        } else if (itemTarefa.prioridade === 'Media') {
            classePrioridade = 'prioridade-media';
        } else if (itemTarefa.prioridade === 'Baixa') {
            classePrioridade = 'prioridade-baixa';
        }
        newLi = newLi +
            `
            <li class="tarefas ${itemTarefa.concluida && "done"}">
                <h3>${itemTarefa.tarefa}</h3>
                <div class="list-priority ${classePrioridade}">${itemTarefa.prioridade}</div>
                <button type="button" class="btn btn-outline-danger" onclick="concluir(${posicao})">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="editar(${posicao})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="deletar(${posicao})">
                    <i class="bi bi-x-lg"></i>
                </button>
            <li/>
        `;
    });
    ulTarefas.innerHTML = newLi;

    localStorage.setItem('tasks', JSON.stringify(listaTarefas))
}

function deletar(posicao) {
    listaTarefas.splice(posicao, 1);
    mostrarNaTela(listaTarefas);
}

function editar(posicao) {
    const novaTarefa = prompt("Edite a tarefa...");
    if (novaTarefa !== null && novaTarefa.trim() !== "") {
        listaTarefas[posicao].tarefa = novaTarefa.trim();
        mostrarNaTela(listaTarefas);
    }
}

function concluir(posicao) {
    listaTarefas[posicao].concluida = !listaTarefas[posicao].concluida;
    mostrarNaTela(listaTarefas);

}

function atualizarPage() {
    const taskStorage = localStorage.getItem('tasks');

    if (taskStorage) {
        listaTarefas = JSON.parse(taskStorage)
    }
    mostrarNaTela(listaTarefas)
}

function filtrar(lista) {
    const select = document.querySelector('#filter-select')
    select.addEventListener('input', (e) => {
        const listaFiltrada = []

        if (select.value == 'all') {
            mostrarNaTela(listaTarefas)
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
            if (palavra_filtrada == valor_digitado) {
                listaPesquisa.push(lista[obj])
            }
            mostrarNaTela(listaPesquisa)
        }
    })
}

atualizarPage()
// ------------------------------------------------------------------------------

//atualizarPage()

// Eventos
// Evento ao clicar em adicionar 
btnAdd.addEventListener("click", adicionaTarefa);
btn_filtros.forEach((btn) => btn.addEventListener("click", () => { filtrarTarefas(btn, listaTarefas) }));

filtrar(listaTarefas)
pesquisar(listaTarefas)


// ========== MURILO =========== //

// ARRAY DE TESTE PARA FILTRO E PESQUISA
// let listaTeste = [
//     { tarefa: 'Estudar matemática', concluida: false, prioridade: 'Baixa' },
//     { tarefa: 'Revisar histórico', concluida: false, prioridade: 'Alta' },
//     { tarefa: 'Fazer exercícios de física', concluida: false, prioridade: 'Média' },
//     { tarefa: 'Ler um livro', concluida: false, prioridade: 'Baixa' },
//     { tarefa: 'Escrever um relatório', concluida: false, prioridade: 'Alta' },
//     { tarefa: 'Organizar a sala de estudos', concluida: false, prioridade: 'Média' },
//     { tarefa: 'Comprar materiais de estudo', concluida: false, prioridade: 'Baixa' },
//     { tarefa: 'Preparar apresentação', concluida: false, prioridade: 'Alta' },
//     { tarefa: 'Revisar anotações', concluida: true, prioridade: 'Média' },
//     { tarefa: 'Planejar a semana', concluida: false, prioridade: 'Baixa' }
// ];

// mostrarNaTela(listaTeste)




// filtrar(listaTeste)
// pesquisar(listaTeste)