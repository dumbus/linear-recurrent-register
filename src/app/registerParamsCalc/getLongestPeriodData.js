const getLongestPeriodData = (polynomial) => {
  const maxDegree = Number(polynomial[0]);

  const maxPeriodLength = Math.pow(2, maxDegree) - 1;

  const maxLengthFormula = `2^${maxDegree} - 2 = ${maxPeriodLength}`;

  const notExistingStateMsg = `(все комбинации, кроме ${maxDegree} нулей)`;

  const maxPeriodData = {
    maxLengthFormula,
    notExistingStateMsg
  };

  return maxPeriodData;
};

export { getLongestPeriodData };
