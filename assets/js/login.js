const loginButton = document.querySelector('#loginUser');
const username = document.querySelector('#usernameInput');
const password = document.querySelector('#passwordInput');

function login(){
    if(username.value == 'admin' && password.value == 'password'){
        alert('Success!');
    } else{
        alert('Please check your username or password...')
    }
}

loginButton.addEventListener('click', login);