const getLongestPeriod = (allPeriods) => {
  let maxLength = 0;
  let indexOfMaxPeriod = 0;

  for (let i = 0; i < allPeriods.length; i++) {
    const currentLength = allPeriods[i].length;

    // if first period is the longest or others are the same length as first,
    // it will save first period as longest (because it is period received by number in a group list)
    if (currentLength > maxLength) {
      maxLength = currentLength;
      indexOfMaxPeriod = i;
    }
  }

  const longestPeriod = allPeriods[indexOfMaxPeriod];

  return longestPeriod;
};

export { getLongestPeriod };
