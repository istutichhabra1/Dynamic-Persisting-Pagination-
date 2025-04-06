const userList = document.getElementById('user-list');
const pagination = document.getElementById('pagination-buttons');
const USERS_PER_PAGE = 6;
const TOTAL_USERS = 10;
const TOTAL_PAGES = Math.ceil(TOTAL_USERS / USERS_PER_PAGE);
async function fetchUsers(page) {
  try {
    userList.innerHTML = '<p>Loading users...</p>'; 
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${USERS_PER_PAGE}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const users = await response.json();
    displayUsers(users);
    highlightActivePage(page);
  } catch (error) {
    userList.innerHTML = `<p style="color:red;">Failed to fetch users: ${error.message}</p>`;
  }
}
function displayUsers(users) {
  userList.innerHTML = '';
  if (users.length === 0) {
    userList.innerHTML = '<p>No users found.</p>';
    return;
  }
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user-card';
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    userList.appendChild(div);
  });
}
function setupPagination() {
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const button = document.createElement('button');
    button.textContent = `Page ${i}`;
    button.addEventListener('click', () => fetchUsers(i));
    pagination.appendChild(button);
  }
}
function highlightActivePage(activePage) {
  const buttons = pagination.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    if (index + 1 === activePage) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
window.addEventListener('DOMContentLoaded', () => {
  fetchUsers(1);
  setupPagination();
});
