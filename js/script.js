
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

