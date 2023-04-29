const getBinaryPolynomial = (polynomial) => {
  const polynomialArr = polynomial.split('');

  const reversedBinaryPolynomialArr = [];


  for (let i = 0; i < 6; i++) {
    const currentIndexStr = i.toString();

    if (polynomialArr.includes(currentIndexStr)) {
      reversedBinaryPolynomialArr.push('1');
    } else {
      reversedBinaryPolynomialArr.push('0');
    }
  }

  const binaryPolynomial = reversedBinaryPolynomialArr.reverse().join('');

  return binaryPolynomial;
};

export { getBinaryPolynomial };
