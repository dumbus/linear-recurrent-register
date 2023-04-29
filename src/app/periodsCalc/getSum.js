const getSum = (state, addictiveBitsIndexes) => {
  let sum = 0;

  for (let i = 0; i < addictiveBitsIndexes.length; i++) {
    sum += Number(state[addictiveBitsIndexes[i]]);
  }

  const resultSum = (sum % 2).toString();

  return resultSum;
};

export { getSum };
