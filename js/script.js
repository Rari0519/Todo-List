const input = document.querySelector('#tarefa-input');
const btnAdd = document.querySelector('#btn-add');
listaTarefas = []

//Função para carregar tarefas do localStorage
function adicionaNoStorage(){

}
//função adicionar tarefa
function adicionaTarefa(event){
    event.preventDefault(); // Impede o comportamento padrão do navegador.
    let valorInput = input.value.trim();
    if(valorInput !== ""){
        listaTarefas.push(valorInput);
        input.value = ''
    }
    console.log(listaTarefas)
};
btnAdd.addEventListener("click",adicionaTarefa);