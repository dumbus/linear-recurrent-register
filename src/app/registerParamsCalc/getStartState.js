const getStartState = (startNumber) => {
  const binStartNumber = Number(startNumber).toString(2);

  let startState = binStartNumber;

  while (startState.length !== 5) {
    startState = '0' + startState;
  }

  return startState;
};

export { getStartState };
