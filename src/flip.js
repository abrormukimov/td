const flip = (task) => {
  task.completed = !(task.completed);
  return task;
};

export default flip;