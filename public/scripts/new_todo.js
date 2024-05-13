window.onload = function() {
    // load users dropdown
    const userid = document.getElementById('userid')
    const selectLabel = document.createElement('option')
    const navToggle = document.getElementById('nav-toggle')

    selectLabel.disabled = true
    selectLabel.selected = true
    selectLabel.value = "Select"
    selectLabel.textContent = "Select a User"
    userid.appendChild(selectLabel)

    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            const option = document.createElement('option')
            option.value = user.id
            option.textContent = user.name
            userid.appendChild(option)
        })
    })

    //load categories dropdown
    const category = document.getElementById('category')
    const selectLabel2 = document.createElement('option')
    selectLabel2.value = "Select"
    selectLabel2.textContent = "Select a Category"
    selectLabel2.disabled = true
    selectLabel2.selected = true
    category.appendChild(selectLabel2)

    fetch('http://localhost:8083/api/categories')
    .then(response => response.json())
    .then(data => {
        data.forEach(cat => {
            const option = document.createElement('option')
            option.value = cat.name
            option.textContent = cat.name
            category.appendChild(option)
        })
            navToggle.addEventListener('click', function() {
        const navContent = document.getElementById('nav-content')
        navContent.classList.toggle('hidden')
    })
    })

    function submitTodo(event) {
        event.preventDefault()
        const userid = document.getElementById('userid')
        const description = document.getElementById('description')
        const category = document.getElementById('category')
        const priority = document.getElementById('priority')
        const deadline = document.getElementById('deadline')

        const todo = {
            userid: userid.value,
            description: description.value,
            category: category.value,
            priority: priority.value,
            deadline: deadline.value,

        }

        fetch('http://localhost:8083/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(data => {
            alert('Todo created successfully')
            window.location.href = '/todos'
        })

    }
    const submitButton = document.getElementById('submit')
    submitButton.addEventListener('click', submitTodo)
}