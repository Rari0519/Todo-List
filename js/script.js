// murilo: alteração geral no script, segue alguns comentários para explicar a lóogica

// array global que vai receber novos objetos
// os arrays abaixo são apenas um "protótipo", mas devem ser adicionados dinamicamente usando o input
tarefas = [
    { 'Nome': 'Estudar', 'Prioridade': 'Baixa', 'Concluido': false },
    { 'Nome': 'Malhar', 'Prioridade': 'Alta', 'Concluido': false },
    { 'Nome': 'Malhar', 'Prioridade': 'Alta', 'Concluido': false },
    { 'Nome': 'Malhar', 'Prioridade': 'Baixa', 'Concluido': false },
    { 'Nome': 'Malhar', 'Prioridade': 'Media', 'Concluido': false },
    { 'Nome': 'Malhar', 'Prioridade': 'Alta', 'Concluido': false }
]

// funcao para construir a div das tarefas, recebe o array global como parâmetro
function construir_div(tarefas) {

    // funcao para limpar a div "lista-tarefas", quando uma nova tarefa é alterada, adicionada, removida, editada...
    function limpar_div(elemento) {
        while (elemento.hasChildNodes()) {
            elemento.removeChild(elemento.firstChild)
        }
    }
    // funcao para construir o HTML interno da tarefa
    function construir_tarefa() {
        
        function construir_container_tarefa() {
            const tarefa = document.createElement('li')
            tarefa.classList.add('tarefa')
            return tarefa
        }

        function construir_nome(valor, obj) {
            const nome = document.createElement('div')
            nome.textContent = valor
            nome.classList.add('nome')
            if (tarefas[obj].Concluido == true) { nome.classList.add('Concluido')}
            return nome
        }

        function construir_prioridade(valor) {
            const prioridade = document.createElement('div')
            prioridade.textContent = valor
            prioridade.classList.add('prioridade')
            return prioridade
        }

        function construir_botoes(obj_index) {
            const botoes = document.createElement('div')
            botoes.classList.add('botoes')

            const concluir = document.createElement('button')
            const excluir = document.createElement('button')
            const editar = document.createElement('button')
            
            concluir.className = 'Concluir CRUD'
            excluir.className = 'Excluir CRUD'
            editar.className = 'Editar CRUD'

            concluir.id = `concluir#${obj_index}`
            excluir.id = `excluir#${obj_index}`
            editar.id = `editar#${obj_index}`

            concluir.innerHTML = "<i class='bx bx-check-circle' ></i>"
            editar.innerHTML = "<i class='bx bxs-pencil' ></i>"
            excluir.innerHTML = "<i class='bx bx-x-circle'></i>"
            botoes.append(concluir, editar, excluir)
            return botoes
        }


        for (obj in tarefas) {
            const tarefa = construir_container_tarefa()
            const nome = construir_nome(tarefas[obj].Nome, obj)
            const prioridade = construir_prioridade(tarefas[obj].Prioridade)
            const botoes = construir_botoes(obj)
            tarefa.append(nome, prioridade, botoes)
            container.append(tarefa)
        }

    }

    const container = document.querySelector('.lista-tarefas')
    limpar_div(container)


    construir_tarefa()
    adicionar_eventos_botoes() // para cada tarefa construída, eventos serão adicionados aos botões
}

// funcao que adiciona evento aos botoes
function adicionar_eventos_botoes() {

    const buttons = document.querySelectorAll('.CRUD')
    const tarefa = document.querySelectorAll('.tarefa')

    // todo botão é criado com um ID. esse id equivale a sua tarefa "pai"
        // exemplo: se eu clicar no botão X da primeira tarefa da lista, o indice retornado é 0 e assim em diante.

    // a funcao abaixo serve justamente para isso, pegar o indice do botão clicado
    function encontrar_indice(elemento) {
        const indice_apos_HASH = elemento.indexOf('#')
        const valor_do_ID = elemento.slice(indice_apos_HASH + 1).trim()
        return valor_do_ID
    }
    

    function pegar_nome_task(elemento) {
        return elemento.firstElementChild
    }
    
    // funcao para adicionar o evento de editar
    function adicionar_editar(nome, array) {
        // funcao cria uma tag form e de input
        function criar_input() {
            const form = document.createElement('form')
            const input = document.createElement('input')
            input.setAttribute('name', 'nome')
            form.setAttribute('method', 'GET')
            form.append(input)
            return form
        }
        // funcao que substitui o "nome" pelo input após clicar no botao de editar
        function substituir_nome_por_input() {
            const input = criar_input()
            nome.replaceWith(input)
            trocar_nome(input)
        }
        // funcao que recebe o valor do input e substuii no array
        // quando o array é modificado, eu renderizo as tarefas de novo e atualizo tudo em tela
        function trocar_nome(input) {
            input.addEventListener('submit', (e) => {
                e.preventDefault()
                const form = new FormData(input)
                array.Nome = form.get('nome')
                construir_div(tarefas)
            })
        }

        substituir_nome_por_input()
    }

    function evento_remover(array, indice) {
        array.splice(indice , 1)
        construir_div(array)
    }

    function adicionar_concluir(elemento, array) {
        elemento.classList.toggle('Concluido')
        array.Concluido = true
    }

    function desfazer_concluir(elemento, array) {
        elemento.classList.toggle('Concluido')
        array.Concluido = false
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = encontrar_indice(button.id) // quando eu pego o index, consigo encontrar a tarefa dentro do array e repassar para qualquer funcao
            if (button.id.includes('editar')) {
                let nome_task = pegar_nome_task(tarefa[index])
                adicionar_editar(nome_task, tarefas[index])
            }
            if (button.id.includes('excluir')) {
                evento_remover(tarefas, index)
            }

            if (button.id.includes('concluir')) {
                const nome_task = pegar_nome_task(tarefa[index])
                if (tarefas[index].Concluido == false) {
                    adicionar_concluir(nome_task, tarefas[index])
                }
                else {
                    desfazer_concluir(nome_task, tarefas[index])
                }
            }

        })
    })
}

// adiciona o filtro, ainda precisa de teste e correçoes
function adicionar_filtro() {
    const select = document.querySelector('select')
    select.addEventListener('input', (e) => {
        const tarefas_filtradas = []
        for (obj in tarefas) {
            if (tarefas[obj].Prioridade == select.value) {
                tarefas_filtradas.push(tarefas[obj])
            }
        }
        construir_div(tarefas_filtradas)
    })
}

construir_div(tarefas)
adicionar_filtro()
