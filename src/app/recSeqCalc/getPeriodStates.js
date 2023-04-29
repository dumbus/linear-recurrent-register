const getPeriodStates = (period) => {
  const states = [];

  for (let i = 0; i < period.length; i++) {
    states.push(period[i].state);
  }

  return states;
};

export { getPeriodStates };
