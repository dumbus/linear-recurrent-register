const findUnusedStartState = (foundStates) => {
  for (let i = 1; i < 32; i++) {
    const binIndex = i.toString(2);

    let currentState = binIndex;
  
    while (currentState.length !== 5) {
      currentState = '0' + currentState;
    }

    if (!foundStates.includes(currentState)) {
      return currentState;
    }
  }

  return null;
};

export { findUnusedStartState };
