const taskKey = '@tasks'

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

  li.id = taskId
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `
            <li id="${task.id}">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
            </li>
        `)
    .join('')
})

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey))
  const task = tasks.find(task => task.id === taskId)
  document.querySelector('#edit_task_id').value = taskId
  document.querySelector('#edit_title').value = task.title
  document.querySelector('#edit_description').value = task.description

  document.querySelector('#edit_dialog').showModal()
}

function closeEditDialog() {
  document.querySelector('#edit_dialog').close()
}