import './style.css';

const tasks = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 3,
  },
  {
    description: 'Clean my room',
    completed: false,
    index: 1,
  },
  {
    description: 'Make breakfast',
    completed: false,
    index: 2,
  },
];

const displayList = () => {
  tasks.sort((a, b) => a.index - b.index);
  const listElement = document.querySelector('#list');
  listElement.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = document.createElement('li');

    const check = document.createElement('input');
    check.type = 'checkbox';

    const desc = document.createElement('span');
    desc.textContent = task.description;

    taskElement.append(check, desc);
    listElement.append(taskElement);
  });
};

displayList();