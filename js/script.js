const input = document.querySelector('#input');
const btnAdd = document.querySelector('.add');
const ul = document.querySelector('.lista-tarefas');

function adicionaTarefa() {
    const tarefa = input.value.trim(); //remove espaço em branco
    
    if (tarefa !== "") { 
        const li = document.createElement('li'); //li dinamico
        li.innerHTML = `
            <span>${tarefa}</span>
            <div class="tarefas">
                <button class="concluido">✓</button>
                <button class="editar"><i class='bx bxs-edit'></i></button>
                <button class="deletar">✗</button>
            </div>
        `;
        ul.appendChild(li); 
        input.value = ""; 
    }
}

btnAdd.addEventListener("click", adicionaTarefa);