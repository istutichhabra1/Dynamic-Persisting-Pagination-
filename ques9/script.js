let todos = [];
const limit = 10;
async function fetchTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    todos = await response.json();
    renderPage(1);
    renderPagination();
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}
function renderPage(page) {
  const container = document.getElementById('todo-container');
  container.innerHTML = '';
  const start = (page - 1) * limit;
  const end = start + limit;
  const pageTodos = todos.slice(start, end);
  pageTodos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.style.border = '1px solid #ccc';
    todoDiv.style.padding = '10px';
    todoDiv.style.marginBottom = '10px';
    const title = document.createElement('span');
    title.innerText = todo.title + ' ';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    todoDiv.appendChild(title);
    todoDiv.appendChild(checkbox);
    container.appendChild(todoDiv);
  });
}
function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const pageCount = Math.ceil(todos.length / limit);
  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.style.margin = '5px';
    button.onclick = () => renderPage(i);
    pagination.appendChild(button);
  }
}
