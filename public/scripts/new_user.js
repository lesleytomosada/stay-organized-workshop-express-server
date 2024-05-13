const navToggle = document.getElementById('nav-toggle')
navToggle.addEventListener('click', function() {
    const navContent = document.getElementById('nav-content')
    navContent.classList.toggle('hidden')
})

const submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validPassword = validatePassword();
    const validUsername = checkUsername();

    if (!validPassword) {
        alert("Passwords do not match");
    } else if (!validUsername) {
        alert("Username already exists");
    } else {
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert("User successfully created");
            window.location.href = '/new_todo';
        })
        .catch(error => {
            console.error(error);
        });
    }

});

function validatePassword() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    if (password !== confirm) {
        alert("Passwords do not match");
        return false;
    }
    return true;
}

function checkUsername(){
    const username = document.getElementById('username').value;
    fetch(`/api/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.exists) {
                alert("Username already exists");
                return false;
            } else {
                return true;
            }
        })
        .catch(error => {
            console.error(error);
        });
    
}