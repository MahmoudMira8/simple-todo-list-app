// define variables for HTML elements
const form = document.querySelector('#todo-form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('#todo-list');

// define function to retrieve todos from localStorage
function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

// define function to save todos to localStorage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// define function to create todo item and append to list
function createTodoItem(todoText) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const span = document.createElement('span');
  const button = document.createElement('button');
  
  checkbox.type = 'checkbox';
  span.innerText = todoText;
  button.innerText = 'Delete';
  
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(button);
  ul.appendChild(li);
}

// define function to load todos and append to list
function loadTodos() {
  const todos = getTodos();
  todos.forEach(todo => {
    createTodoItem(todo);
  });
}

// define function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== '') {
    createTodoItem(todoText);
    const todos = getTodos();
    todos.push(todoText);
    saveTodos(todos);
    input.value = '';
  }
}

// define function to handle delete button click
function handleDeleteClick(event) {
  const li = event.target.closest('li');
  const span = li.querySelector('span');
  const todoText = span.innerText;
  const todos = getTodos();
  const index = todos.indexOf(todoText);
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos(todos);
    li.remove();
  }
}

// add event listeners
form.addEventListener('submit', handleFormSubmit);
ul.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    handleDeleteClick(event);
  }
});

// load todos on page load
loadTodos();
