const getAddictiveBits = (binaryPolynomial) => {
  const valuablePolynomial = binaryPolynomial.slice(1);
  const addictiveBits = [];

  for (let i = 0; i < valuablePolynomial.length; i++) {
    if (valuablePolynomial[i] === '1') {
      addictiveBits.push(i);
    }
  }

  return addictiveBits;
};

export { getAddictiveBits };
