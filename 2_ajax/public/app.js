document.getElementById("registrationForm").addEventListener('submit', function(e){

    e.preventDefault(); // Prevent the default form submission

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function(){

        if(xhr.status === 201 || xhr.status === 200){
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const exists = users.some(user => user.email === userData.email);

            if(!exists){
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = 'list.html';
            }else{
                alert('User already exists!');
            }
        }else{
            alert('Error');
        }


    };


    xhr.send(JSON.stringify(userData));
});