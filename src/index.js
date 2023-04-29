import { getData, getExitCommand } from './app/utils/getUserInput.js';
import { validateData } from './app/utils/validator.js';

import { getBinaryPolynomial } from './app/registerParamsCalc/getBinaryPolynomial.js';
import { getStartState } from './app/registerParamsCalc/getStartState.js';
import { getAddictiveBits } from './app/registerParamsCalc/getAddictiveBits.js';

import { findAllPeriods } from './app/periodsCalc/findAllPeriods.js';

import {
  printRegisterParametersData,
  printAllPeriodsData,
  printRecSeqAnalysisResults
} from './app/utils/messenger.js';

let isDataValid = false;

let data;

while (!isDataValid) {
  data = await getData();

  isDataValid = validateData(data);
}

const { polynomial, startNumber } = data;

const binaryPolynomial = getBinaryPolynomial(polynomial);
const startState = getStartState(startNumber);
const addictiveBits = getAddictiveBits(binaryPolynomial);

const allPeriods = findAllPeriods(startState, addictiveBits);

printRegisterParametersData(polynomial, binaryPolynomial, startNumber, startState);
printAllPeriodsData(allPeriods);
printRecSeqAnalysisResults(allPeriods);

await getExitCommand();
