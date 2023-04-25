const polynomial = '5430'; // Характеристический многочлен для Вашего варианта (см. таблицу в задании к ЛР)
const listNumber = '6'; // Ваш номер в группе по журналу (в десятичной системе счисления)

const data = { polynomial, listNumber };

const errors = {
  invalidData: 'Возникли ошибки при вводе данных:',
  invalidPolynomial: 'Ошибка: Неверно введён характеристический многочлен!',
  invalidListNumber: 'Ошибка: Неверно введён номер в списке группы!'
};

const messages = {
  inputPolynomialMsg: 'Введите характеристический многочлен согласно варианту: ',
  inputListNumberMsg: 'Введите ваш номер в списке группы: ',
  tryAgainMsg: '!!! Проверьте данные и попробуйте ещё раз !!!',
  inputExitCommand: '!!! Расчёты завершены, нажмите Enter, чтобы завершить выполнение программы. !!!',
  emptyLineMsg: ''
};

const validatePolynomial = (polynomial) => {
  const regex = /[0-5]/g;

  const isRepeated = /([0-5])(?=\1)/g;

  const isValid = regex.test(polynomial) && !isRepeated.test(polynomial);

  return isValid;
};

const validateListNumber = (listNumber) => {
  const isValid = listNumber > 0 && listNumber < 32;

  return isValid;
};

const validateData = (data) => {
  const { polynomial, listNumber } = data;

  const isPolynomialValid = validatePolynomial(polynomial);
  const isListNumberValid = validateListNumber(listNumber);

  if (!isPolynomialValid || !isListNumberValid) {
    console.log(messages.emptyLineMsg);
    console.log(errors.invalidData);

    if (!isPolynomialValid) console.log(errors.invalidPolynomial);
    if (!isListNumberValid) console.log(errors.invalidListNumber);
    
    console.log(messages.tryAgainMsg);
    console.log(messages.emptyLineMsg);

    return false;
  }

  return true;
};

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

const getStartState = (listNumber) => {
  const binListNumber = Number(listNumber).toString(2);

  let startState = binListNumber;

  while (startState.length !== 5) {
    startState = '0' + startState;
  }

  return startState;
};

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

const getSum = (state, addictiveBitsIndexes) => {
  let sum = 0;

  for (let i = 0; i < addictiveBitsIndexes.length; i++) {
    sum += Number(state[addictiveBitsIndexes[i]]);
  }

  const resultSum = (sum % 2).toString();

  return resultSum;
};

const getNewState = (prevState, sum) => {
  const prevStateCut = prevState.slice(0, prevState.length - 1);

  const newState = sum + prevStateCut;

  return newState;
};

const getPeriod = (startState, addictiveBits) => {
  const stateArr = [];
  const sumArr = [];
  const periodItems = [];

  let state = startState;
  let sum;

  let isPeriodFinished = false;

  while (!isPeriodFinished) {
    sum = getSum(state, addictiveBits);

    const periodItem = {
      state,
      sum
    };

    stateArr.push(state);
    sumArr.push(sum);
    periodItems.push(periodItem);

    const newState = getNewState(state, sum);

    if (stateArr.includes(newState)) {
      isPeriodFinished = true;
    }
    
    state = newState;
  }

  return periodItems;
};

const findUnusedStartState = (foundStates) => {
  for (let i = 1; i < 32; i++) {
    const binIndex = i.toString(2);

    let currentState = binIndex;
  
    while (currentState.length !== 5) {
      currentState = '0' + currentState;
    }

    if (!foundStates.includes(currentState)) {
      return currentState;
    }
  }

  return null;
};

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

const getPolynomialFormula = (polynomial) => {
  const addendums = [];

  for (let i = 0; i < polynomial.length; i++) {
    const currentDegree = polynomial[i];

    currentDegree === '0' ? addendums.push('1') : addendums.push(`x^${currentDegree}`);
  }

  const polynomialFormula = addendums.join(' + ');

  return polynomialFormula;
};

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

const printVariantData = (polynomial, listNumber) => {
  const polynomialFormula = getPolynomialFormula(polynomial);

  const variantMsg = 'Вариант:';
  const polynomialFormulaMsg = `№${listNumber}: h(x) = ${polynomialFormula}`;

  const messagesArr = [variantMsg, polynomialFormulaMsg];

  console.log(messages.emptyLineMsg);
  for (let i = 0; i < messagesArr.length; i++) {
    console.log(messagesArr[i]);
  }
};

const printStartData = (polynomial, listNumber, startState) => {
  const startDataMsg = 'Выполнение работы:';
  const startStateMsg = `Начальное заполнение – номер по списку в двоичном виде, младший разряд справа: ${listNumber} = ${startState}`;

  const { maxLengthFormula, notExistingStateMsg } = getLongestPeriodData(polynomial);

  const maxPeriodMsg = `Максимальный период рекуррентной последовательности для регистра заданным примитивным многочленом: ${maxLengthFormula}, ${notExistingStateMsg}`;

  const messagesArr = [startDataMsg, startStateMsg, maxPeriodMsg];

  console.log(messages.emptyLineMsg);
  for (let i = 0; i < messagesArr.length; i++) {
    console.log(messagesArr[i]);
  }
};

const getRawColumns = (period) => {
  const periodLength = period.length;

  const rawColumns = [];

  // № column
  const numberOfRoundColumn = ['№'];

  for (let i = 0; i < periodLength; i++) {
    const currentNumber = (i + 1).toString();

    numberOfRoundColumn.push(currentNumber);
  }
  rawColumns.push(numberOfRoundColumn);

  // state column
  const stateColumn = ['Состояние'];

  for (let i = 0; i < periodLength; i++) {
    const currentPeriod = period[i].state;

    stateColumn.push(currentPeriod);
  }
  rawColumns.push(stateColumn);

  // sum column
  const sumColumn = ['Результат суммы'];

  for (let i = 0; i < periodLength; i++) {
    const currentSum = period[i].sum;

    sumColumn.push(currentSum);
  }
  rawColumns.push(sumColumn);

  return rawColumns;
};

const getRecSeq = (period) => {
  const periodLength = period.length;

  let recSeq = '';

  for (let i = 0; i < periodLength; i++) {
    recSeq = period[i].sum + recSeq;
  }

  return recSeq;
};

const getPeriodData = (period) => {
  const rawColumns = getRawColumns(period);
  const recSeq = getRecSeq(period);
  const periodLength = period.length;

  const maxStrLengthArr = [0, 0, 0];

  for (let i = 0; i < rawColumns.length; i++) {
    for (let j = 0; j <= periodLength; j++) {
      const currentStrLength = rawColumns[i][j].length;

      if (currentStrLength > maxStrLengthArr[i]) {
        maxStrLengthArr[i] = currentStrLength;
      }
    }
  }

  const columns = [[], [], []];

  for(let i = 0; i < rawColumns.length; i++) {
    const currentMaxLength = maxStrLengthArr[i];

    for(let j = 0; j <= periodLength; j++) {
      let currentStr = rawColumns[i][j];
      const offset = currentMaxLength - currentStr.length;

      let startOffset = 0;
      let endOffset = 0;

      if (offset > 0) {
        startOffset = Math.floor(offset / 2);
        endOffset = offset - startOffset;
      }

      while (startOffset > 0) {
        currentStr = ' ' + currentStr;
        startOffset--;
      }

      while (endOffset > 0) {
        currentStr = currentStr + ' ';
        endOffset--;
      }

      columns[i].push(currentStr);
    }
  }

  const lines = [];

  for (let i = 0; i <= periodLength; i++) {
    const line = `| ${columns[0][i]} | ${columns[1][i]} | ${columns[2][i]} |`;

    lines.push(line);
  }

  let divider = '';
  let dividerLength = lines[0].length;

  for (let j = 0; j < dividerLength; j++) {
    divider += '-';
  }

  const table = [];

  for (let i = 0; i <= periodLength; i++) {
    const line = lines[i];

    table.push(divider);
    table.push(line);
  }
  table.push(divider);

  const periodData = {
    periodTable: table,
    periodRecSeq: recSeq,
    periodLength
  };

  return periodData;
};

const printAllPeriodsData = (allPeriods) => {
  const numberOfPeriods = allPeriods.length;

  for (let i = 0; i < numberOfPeriods; i++) {
    const { periodTable, periodRecSeq, periodLength } = getPeriodData(allPeriods[i]);

    const recSeqMsg = `ЛРП: ${periodRecSeq}`;
    const periodLengthMsg = `Период равен ${periodLength}`;

    console.log(messages.emptyLineMsg);
    if (i === 0) {
      console.log('Проведем моделирование работы ЛРР, представив таблицу смены его состояний:');
    } else {
      console.log('Выберем другое начальное заполнение, выбирая среди отсутствующих состояний, проведем моделирование:');
    }

    for (let j = 0; j < periodTable.length; j++) {
      const row = periodTable[j];
  
      console.log(row);
    }
    console.log(recSeqMsg);
    console.log(periodLengthMsg);
  }
};

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

const getPeriodStates = (period) => {
  const states = [];

  for (let i = 0; i < period.length; i++) {
    states.push(period[i].state);
  }

  return states;
};

const getRecSeqAnalysis = (allPeriods) => {
  const longestPeriod = getLongestPeriod(allPeriods);
  const states = getPeriodStates(longestPeriod);

  const recSeq = getRecSeq(longestPeriod);

  // get period of recurrent sequence
  const recSeqPeriod = recSeq.length;

  // get recurrent sequence balance
  const recSeqBalance = {
    zeroes: 0,
    ones: 0
  };

  for (let i = 0; i < recSeq.length; i++) {
    if (recSeq[i] === '0') recSeqBalance.zeroes++;

    if (recSeq[i] === '1') recSeqBalance.ones++;
  }

  // get recurrent sequence series lengths
  const recSeqSeriesLength = [];

  let currentSeriesLength = 1;

  for (let i = 0; i < recSeq.length; i++) {
    if (recSeq[i] === recSeq[i + 1]) {
      currentSeriesLength++;
    } else {
      recSeqSeriesLength.push(currentSeriesLength);
      currentSeriesLength = 1;
    }
  }

  // get number of recurrent sequence series lengths in format: { 'length of series': 'number od series that length' }
  const recSeqSeries = {};

  for (let i = 0; i < recSeqSeriesLength.length; i++) {
    const currentLengthKey = recSeqSeriesLength[i].toString();

    if (currentLengthKey in recSeqSeries) {
      recSeqSeries[currentLengthKey]++;
    } else {
      recSeqSeries[currentLengthKey] = 1;
    }
  }

  // check if "window" property is fulfilled
  const uniqueStates = new Set(states);

  const numberOfUniqueStates = uniqueStates.size;

  const windowProperty = {
    states,
    numberOfUniqueStates,
    isFulfilled: true
  };

  if (numberOfUniqueStates !== recSeqPeriod) {
    windowProperty.isFulfilled = false;
  }

  // create object with analysis results
  const recSeqAnalysisResults = {
    recSeq,
    recSeqPeriod,
    recSeqBalance,
    recSeqSeries,
    windowProperty
  };

  return recSeqAnalysisResults;
};

const printRecSeqAnalysisResults = (allPeriods) => {
  const { 
    recSeq,
    recSeqPeriod,
    recSeqBalance,
    recSeqSeries,
    windowProperty
  } = getRecSeqAnalysis(allPeriods);

  const analysisMsg = 'Исследуем ЛРП с наибольшим периодом:';
  const recSeqMsg = `Линейно рекуррентная последовательность: ${recSeq}.`;
  const recSeqPeriodMsg = `Период последовательности: ${recSeqPeriod}.`;
  const recSeqBalanceMsg = `Баланс единиц и нулей: ${recSeqBalance.ones} единиц, ${recSeqBalance.zeroes} нулей.`;

  // recurrent sequence series
  const lengthOfSeries = Object.keys(recSeqSeries);
  const quantityOfSeries = Object.values(recSeqSeries);

  let seriesArr = [];

  for (let i = 0; i < quantityOfSeries.length; i++ ) {
    const currentSeries = `${quantityOfSeries[i]} серий длины ${lengthOfSeries[i]}`;

    seriesArr.push(currentSeries);
  }

  const seriesStr = seriesArr.join(', ');

  const recSeqSeriesMsg = `Серии: ${seriesStr}.`;

  // recurrent sequence "window" property
  const { states, numberOfUniqueStates, isFulfilled } = windowProperty;

  const windowPropertyStates = [];

  for (let i = 0; i < states.length; i++ ) {
    const currentState = `${states[i]}`;

    windowPropertyStates.push(currentState);
  }

  const windowPropertyStatesStr = windowPropertyStates.join(', ');
  const windowPropertyNumberStr = `Число полученных комбинаций: ${numberOfUniqueStates}.`;
  const windowPropertyRepeatingStr = isFulfilled
    ? 'Среди комбинаций нет повторяющихся, следовательно, свойство "окна" выполняется.'
    : 'Среди комбинаций есть повторяющиеся, следовательно, свойство "окна" не выполняется.';


  const windowPropertyMsg = `Свойство "окна":\n${windowPropertyStatesStr} \n${windowPropertyNumberStr} ${windowPropertyRepeatingStr}`;

  // printing of results
  const analysisMessages = [recSeqMsg, recSeqPeriodMsg, recSeqBalanceMsg, recSeqSeriesMsg, windowPropertyMsg];

  console.log(messages.emptyLineMsg);
  console.log(analysisMsg);

  for (let i = 0; i < analysisMessages.length; i++) {
    console.log(`${i + 1}) ${analysisMessages[i]}`);
  }
};

const printResults = (polynomial, listNumber, startState, allPeriods) => {
  printVariantData(polynomial, listNumber);
  printStartData(polynomial, listNumber, startState);
  printAllPeriodsData(allPeriods);
  printRecSeqAnalysisResults(allPeriods);
};

const isDataValid = validateData(data);

if (isDataValid) {
  const binaryPolynomial = getBinaryPolynomial(polynomial);
  const startState = getStartState(listNumber);
  const addictiveBits = getAddictiveBits(binaryPolynomial);

  const allPeriods = findAllPeriods(startState, addictiveBits);

  printResults(polynomial, listNumber, startState, allPeriods);
}
