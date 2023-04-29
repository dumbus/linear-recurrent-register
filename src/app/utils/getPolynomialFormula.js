const getPolynomialFormula = (polynomial) => {
  const addendums = [];

  for (let i = 0; i < polynomial.length; i++) {
    const currentDegree = polynomial[i];

    currentDegree === '0' ? addendums.push('1') : addendums.push(`x^${currentDegree}`);
  }

  const polynomialFormula = addendums.join(' + ');

  return polynomialFormula;
};

export { getPolynomialFormula };
