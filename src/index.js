import './style.css';

import flip from './flip.js';

import {
  add,
  remove,
  edit,
  clear,
} from './actions.js';

let tasks = [];

const getData = () => {
  const data = localStorage.getItem('tasks');
  if (data != null) {
    tasks = JSON.parse(data);
  } else {
    tasks = [];
  }
  return tasks;
};

const saveData = (tasks) => {
  tasks.sort((a, b) => a.index - b.index);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const editList = (tasks, task, e) => {
  const originalDesc = e.target.parentElement.parentElement.querySelector('.description');

  originalDesc.contentEditable = 'true';
  originalDesc.focus();

  const originalButtons = originalDesc.parentElement.querySelector('.buttons');

  originalButtons.classList.add('display-none');

  const saveBtn = document.createElement('button');
  saveBtn.id = 'save-btn';
  saveBtn.textContent = 'Save';
  originalDesc.parentElement.append(saveBtn);

  saveBtn.addEventListener('click', () => {
    const input = originalDesc.textContent;
    originalDesc.contentEditable = false;
    tasks = edit(tasks, task, input);
    saveData(tasks);
    saveBtn.remove();
    originalButtons.classList.remove('display-none');
  });
};

const disableInput = () => {
  const editBtns = document.querySelectorAll('.edit-btn');
  editBtns.forEach((btn) => {
    btn.disabled = true;
  });
  document.querySelector('#input-field').disabled = true;
};

const displayList = () => {
  document.querySelector('#input-field').disabled = false;

  tasks.sort((a, b) => a.index - b.index);
  const listElement = document.querySelector('#list');
  listElement.innerHTML = '';
  tasks.forEach((task, i) => {
    const taskElement = document.createElement('li');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;

    check.addEventListener('change', () => {
      tasks[i] = flip(task);
      saveData(tasks);
    });

    const desc = document.createElement('span');
    desc.textContent = task.description;
    desc.className = 'description';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    editBtn.addEventListener('click', (e) => {
      disableInput();
      editList(tasks, task, e);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', () => {
      tasks = remove(tasks, task);
      saveData(tasks);
      displayList();
    });

    const buttons = document.createElement('span');
    buttons.className = 'buttons';
    buttons.append(editBtn, deleteBtn);

    taskElement.append(check, desc, buttons);
    listElement.append(taskElement);
  });
};

const formElement = document.querySelector('#input-field');

formElement.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const input = formElement.value;
    formElement.value = '';
    tasks = add(tasks, input);
    saveData(tasks);
    displayList(tasks);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  tasks = getData();
  displayList();
});

const refreshBtn = document.querySelector('#refresh');
refreshBtn.addEventListener('click', () => {
  saveData(tasks);
  displayList();
});

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
  tasks = clear(tasks);
  saveData(tasks);
  displayList();
});