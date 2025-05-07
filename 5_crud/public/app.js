const apiUrl = 'http://localhost:5000/api/items';

// Load initial items and bind events
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('createBtn').addEventListener('click', createItem);
  document.getElementById('updateBtn').addEventListener('click', updateItem);
  document.getElementById('deleteBtn').addEventListener('click', deleteItem);
  getAllItems();
});

function createItem() {
  const name = document.getElementById('createName').value.trim();
  const price = parseFloat(document.getElementById('createPrice').value);

  if (!name || isNaN(price)) {
    alert('Please enter a valid name and price.');
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, price })
  })
  .then(res => res.json())
  .then(data => {
    alert(`Item Created: ${data.name}`);
    document.getElementById('createName').value = '';
    document.getElementById('createPrice').value = '';
    getAllItems();
  })
  .catch(err => console.error('Create Error:', err));
}

function updateItem() {
  const id = document.getElementById('updateId').value.trim();
  const name = document.getElementById('updateName').value.trim();

  if (!id || !name) {
    alert('Please enter both Item ID and new name.');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  })
  .then(res => res.json())
  .then(data => {
    alert(`Item Updated: ${data.name}`);
    document.getElementById('updateId').value = '';
    document.getElementById('updateName').value = '';
    getAllItems();
  })
  .catch(err => console.error('Update Error:', err));
}

function deleteItem() {
  const id = document.getElementById('deleteId').value.trim();

  if (!id) {
    alert('Please enter the Item ID to delete.');
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(() => {
    alert('Item Deleted');
    document.getElementById('deleteId').value = '';
    getAllItems();
  })
  .catch(err => console.error('Delete Error:', err));
}

function getAllItems() {
  const itemsList = document.getElementById('itemsList');
  itemsList.innerHTML = '<li>Loading...</li>';

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      itemsList.innerHTML = '';
      if (data.length === 0) {
        itemsList.innerHTML = '<li>No items found.</li>';
        return;
      }
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item._id} - ${item.name} - $${item.price}`;
        itemsList.appendChild(li);
      });
    })
    .catch(err => {
      itemsList.innerHTML = '<li>Error loading items.</li>';
      console.error('Fetch Error:', err);
    });
}