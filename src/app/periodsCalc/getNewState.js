const getNewState = (prevState, sum) => {
  const prevStateCut = prevState.slice(0, prevState.length - 1);

  const newState = sum + prevStateCut;

  return newState;
};

export { getNewState };
