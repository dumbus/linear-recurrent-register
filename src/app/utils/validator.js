import { errors, messages } from './messenger.js';

const validatePolynomial = (polynomial) => {
  const areCharactersNotAllowed = !(/[0-5]/g).test(polynomial);
  const isRepeated = (/([0-5])(?=\1)/g).test(polynomial);
  const noZero = Boolean(polynomial.indexOf('0') === -1);
  const noFive = Boolean(polynomial.indexOf('5') === -1);
  const noOrderDesc = polynomial.split('').sort((a, b) => b - a).join('') !== polynomial;

  const polynomialErrors = [];

  if (areCharactersNotAllowed) polynomialErrors.push(errors.invalidPolynomialNotAllowedChars);
  if (isRepeated && !areCharactersNotAllowed) polynomialErrors.push(errors.invalidPolynomialDoubles);
  if (noOrderDesc && !areCharactersNotAllowed) polynomialErrors.push(errors.invalidPolynomialNoDecsOrder);
  if (noZero && !areCharactersNotAllowed) polynomialErrors.push(errors.invalidPolynomialNoZero);
  if (noFive && !areCharactersNotAllowed) polynomialErrors.push(errors.invalidPolynomialNoFive);

  return polynomialErrors;
};

const validateStartNumber = (startNumber) => {
  const isValid = startNumber > 0 && startNumber < 32;

  const startNumberErrors = [];

  if (!isValid) startNumberErrors.push(errors.invalidStartNumber);

  return startNumberErrors;
};

const validateData = (data) => {
  const { polynomial, startNumber } = data;

  const foundErrors = [];

  foundErrors.push(...validatePolynomial(polynomial));
  foundErrors.push(...validateStartNumber(startNumber))

  if (foundErrors.length) {
    console.log(messages.emptyLineMsg);
    console.log(errors.invalidData);

    foundErrors.forEach((error) => console.log(error));
    
    console.log(messages.tryAgainMsg);
    console.log(messages.emptyLineMsg);

    return false;
  }

  return true;
};

export { validateData };
