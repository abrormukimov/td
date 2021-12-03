const flip = (t) => {
  t.completed = !(t.completed);
  return t;
};

export default flip;