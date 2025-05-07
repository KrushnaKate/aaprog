const users = JSON.parse(localStorage.getItem('users')) || [];
const userList = document.getElementById('userList');

if(users.length === 0){
    userList.innerHTML = '<p>No users found.</p>';
}else{
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(li);

    });
}

document.getElementById('clearButton').addEventListener('click', function(){
    localStorage.removeItem('users');
    window.location.reload();
});