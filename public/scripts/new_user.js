const navToggle = document.getElementById('nav-toggle')
navToggle.addEventListener('click', function() {
    const navContent = document.getElementById('nav-content')
    navContent.classList.toggle('hidden')
})

const submit = document.getElementById('submit');
submit.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const validPassword = validatePassword();
    const validUsername = await checkUsername();

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
        return false;
    }
    return true;
}

function checkUsername(){
    const username = document.getElementById('username').value;
    return fetch(`/api/username_available/${username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.available === true) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error(error);
        });
    
}

function postNewUser() {
    
}