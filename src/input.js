const parse = (c) => {
  switch (c) {
    case 'd':
      return { status: 'Dev', effort: 0.5 };
    case 'D':
      return { status: 'Dev', effort: 1.0 };
    case 'q':
      return { status: 'QA', effort: 0.5 };
  }
};

const translate = (input) => {
  const state = {
    Dev: 0,
    QA: 0
  };

  input.split('').forEach((c) => {
    const { status, effort } = parse(c);
    state[status] = state[status] + effort;
  });
  return state;
};

export { translate };
