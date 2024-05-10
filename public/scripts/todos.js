document.addEventListener('DOMContentLoaded', function() {
    const users = document.getElementById('users')
    const selectLabel = document.createElement('option')
    selectLabel.value = "Select"
    selectLabel.textContent = "Select a User"
    selectLabel.disabled = true
    selectLabel.selected = true
    users.appendChild(selectLabel)
    fetch("http://localhost:8083/api/users")
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const option = document.createElement('option')
            option.value = user.id
            option.textContent = user.name
            users.appendChild(option)
        })
    })
    users.addEventListener('change', getTodos)
})

function getTodos() {
    const users = document.getElementById('users')
    const todoResults = document.getElementById('todoResults')
    const userId = users.value
    console.log(userId)
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    todoResults.innerHTML = ''
    data.forEach(todo => {
        const card = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">${todo.description}</div>
          <p class="text-gray-700 text-base">
            ${todo.completed ? 'Completed' : 'Not Completed'}
          </p>
          <p class="text-gray-700 text-base">
            Category: ${todo.category}
          </p>
          <p class="text-gray-700 text-base">
            Priority: ${todo.priority}
          </p>
          <p class="text-gray-700 text-base">
            Deadline: ${todo.deadline}
          </p>
        </div>
      </div>`
        todoResults.innerHTML += card
    })
    })
}

