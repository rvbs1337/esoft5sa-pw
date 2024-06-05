const taskKey = '@tasks'

let selectedTaskId = null

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = `id-${taskId}`
  li.innerHTML = `
    <div>
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
    </div>
    <button title="Editar tarefa" onClick="openEditDialog(${taskId})">✏️</button>
    <button title="Deletar tarefa" onClick="deleteTask(${taskId})">❌</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({
    id: taskId,
    title: taskTitle,
    description: taskDescription,
  })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  const task = tasks[selectedTaskId]

  const dialog = document.querySelector('dialog')

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')

  editTitle.value = task.title
  editDescription.value = task.description

  dialog.showModal()
}

function closeDialog() {
  const dialog = document.querySelector('dialog')
  dialog.close()
}

function deleteTask(taskId){
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  selectedTaskId = tasks.findIndex((task) => task.id === taskId)
  tasks.splice(selectedTaskId,1)
  if (tasks.length <= 0){
    localStorage.removeItem(taskKey)
  }else{
    localStorage.setItem(taskKey, JSON.stringify(tasks))
  }
  location.reload()
}

function editTask(event){
  event.preventDefault()

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

  const task = tasks[selectedTaskId]

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')

  task.title = editTitle.value
  task.description = editDescription.value 

  localStorage.setItem(taskKey, JSON.stringify(tasks))

  location.reload()
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')

  taskList.innerHTML = tasks
    .map(
      (task) => `
      <li id='id-${task.id}'>
        <div id="task">
          <h2>${task.title}</h2>
          <p>${task.description}</p>
        </div>
        <div id="buttons">
          <button title="Editar tarefa" onClick="openEditDialog(${task.id})">✏️</button>
          <button title="Deletar tarefa" onClick="deleteTask(${task.id})">❌</button>
        </div>
      </li>
    `
    )
    .join('')
})