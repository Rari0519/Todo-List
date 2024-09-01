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
