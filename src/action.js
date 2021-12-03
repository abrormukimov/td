const add = (tasks, input) => {
  const task = {
    description: input,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  return tasks;
};

const shiftIndex = (tasks, taskIndex) => {
  tasks = tasks.map((task) => {
    if (task.index > taskIndex) {
      task.index -= 1;
    }
    return task;
  });
  return tasks;
};

const remove = (tasks, task) => {
  const taskIndex = tasks.findIndex((item) => (item.index === task.index));
  tasks = tasks.filter((item) => (item.index !== task.index));
  tasks = shiftIndex(tasks, taskIndex);
  return tasks;
};

const edit = (tasks, task, desc) => {
  tasks = tasks.map((item) => {
    if ((item.index === task.index) && (item.description === task.description)) {
      item.description = desc;
    }
    return item;
  });
  return tasks;
};

const reorder = (tasks) => {
  let i = 1;
  tasks = tasks.map((task) => {
    task.index = i;
    i += 1;
    return task;
  });
  return tasks;
};

const clear = (tasks) => {
  tasks = tasks.filter((item) => !(item.completed));
  tasks = reorder(tasks);
  return tasks;
};

export {
  add,
  remove,
  edit,
  clear,
};