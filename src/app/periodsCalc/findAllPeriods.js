import { getPeriod } from './getPeriod.js';
import { findUnusedStartState } from './findUnusedStartState.js';

const findAllPeriods = (startState, addictiveBits) => {
  const foundPeriods = [];
  const foundStates = [];

  let areAllPeriodsFound = false;

  let state = startState;

  while (!areAllPeriodsFound) {
    const period = getPeriod(state, addictiveBits);

    foundPeriods.push(period);
    period.forEach((item) => {
      foundStates.push(item.state);
    });

    if (foundStates.length !== 31) {
      state = findUnusedStartState(foundStates);
    } else {
      areAllPeriodsFound = true;
    }
  }

  return foundPeriods;
};

export { findAllPeriods };
