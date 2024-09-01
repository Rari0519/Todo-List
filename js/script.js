// Selecionando elementos
const input = document.querySelector("#tarefa-input"); /* input */
const btnAdd = document.querySelector("#btn-add"); /* Botão add */
const ulTarefas = document.querySelector(".list-task"); /* Lista tarefas- */
// const tarefas = document.querySelector('.tarefas');
const btn_filtros = document.querySelectorAll(".filtro");

// ------------------------------------------------------------------------------

// definindo array para armazenar as lista de tarefas
let listaTarefas = [];

// Funções
function adicionaTarefa() {
  const tarefa = input.value.trim();
  if (tarefa !== "") {
    listaTarefas.push(input.value);
    mostrarNaTela(listaTarefas);
  }
  input.value = ""; /* limpando input após adicionar nova tarefa */ 
}

function mostrarNaTela() {
  let newLi = "";

  listaTarefas.forEach((itemTarefa) => {
    newLi =
      newLi +
      `
            <li class="tarefas">
                <h3>${itemTarefa}</h3>
                <div class="list-priority"></div>
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-danger">
                    <i class="bi bi-x-lg"></i>
                </button>
            <li/>
        `;
  });
    ulTarefas.innerHTML = newLi;
    // console.log(JSON.stringify(mostrarNaTela));
}

// function deletar(posicao) {
//     listaTarefas.splice(posicao, 1);
//     mostrarNaTela();
// }

// function editar(posicao) {
//     const novaTarefa = prompt("Edite a tarefa...");
//     if (novaTarefa !== null && novaTarefa.trim() !== "") {
//         listaTarefas[posicao].tarefa = novaTarefa.trim();
//         mostrarNaTela();
//     }
// }

// function concluir(posicao) {
//     listaTarefas[posicao].concluida = !listaTarefas[posicao].concluida;

//     const label = document.querySelector(`#label-${posicao}`);

//     if (listaTarefas[posicao].concluida == true) {
//         label.style.textDecoration = 'line-through';
//     } else{
//         label.style.textDecoration = 'none';
//     }
// }

// // utiliza o nome da classe e o atributo concluido para gerar um novo array com as tarefas filtradas
// function filtrarTarefas(btn, tarefas) {

//     const tarefas_filtradas = []

//    for (obj in tarefas) {
//         if (btn.className.includes('pendentes') && tarefas[obj].concluida == false) {
//             tarefas_filtradas.push(tarefas[obj])
//         }
//         else if (btn.className.includes('concluidas') && tarefas[obj].concluida == true) {
//             tarefas_filtradas.push(tarefas[obj])
//         }
//         else if (btn.className.includes('todas')) {
//             mostrarNaTela(listaTarefas)
//             return
//         }
//     }

//     mostrarNaTela(tarefas_filtradas)

// }

// ------------------------------------------------------------------------------

// Eventos
btnAdd.addEventListener("click", adicionaTarefa);
// btn_filtros.forEach((btn) => btn.addEventListener("click", () => { filtrarTarefas(btn, listaTarefas) }));
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