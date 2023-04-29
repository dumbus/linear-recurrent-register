import { getPolynomialFormula } from './getPolynomialFormula.js';
import { getLongestPeriodData } from '../registerParamsCalc/getLongestPeriodData.js';
import { getPeriodData } from './getPeriodData.js';
import { getRecSeqAnalysis } from '../recSeqCalc/getRecSeqAnalysis.js';

const errors = {
  invalidData: 'Возникли ошибки при вводе данных:',
  invalidPolynomialNotAllowedChars: 'Ошибка: Использованы недопустимые символы при вводе степеней характеристического многочлена h(x)!',
  invalidPolynomialDoubles: 'Ошибка: В степенях коэффициентов многочлена h(x) не может быть повторений!',
  invalidPolynomialNoDecsOrder: 'Ошибка: Степени коэффициентов многочлена h(x) должны быть указаны по убыванию!',
  invalidPolynomialNoZero: 'Ошибка: В степенях коэффициентов многочлена h(x) обязательно должен присутствовать символ "0"',
  invalidPolynomialNoFive: 'Ошибка: В степенях коэффициентов многочлена h(x) обязательно должен присутствовать символ "5"',
  invalidStartNumber: 'Ошибка: Начальное положение регистра должно быть числом от 1 до 31!',
  invalidPeriod: 'Длина периода не равна максимальной, дальнейшие вычисления невозможны!'
};

const messages = {
  inputPolynomialMsg: 'Введите степени коэффициентов характеристического многочлена h(x) по убыванию (степени "5" и "0" являются обязательными): ',
  inputStartNumberMsg: 'Введите начальное положение регистра в десятичной системе счисления (число от 1 до 31): ',
  tryAgainMsg: '!!! Проверьте введённые данные и попробуйте ещё раз !!!',
  inputExitCommand: '!!! Расчёты завершены, нажмите Enter, чтобы завершить выполнение программы. !!!',
  emptyLineMsg: ''
};

const printRegisterParametersData = (polynomial, binaryPolynomial, startNumber, startState) => {
  const polynomialFormula = getPolynomialFormula(polynomial);
  const { maxLengthFormula, notExistingStateMsg } = getLongestPeriodData(polynomial);

  const registerParametersMsg = 'Параметры регистра:';
  const polynomialFormulaMsg = `Характеристический многочлен: h(x) = ${polynomialFormula}`;
  const binaryPolynomialMsg = `Двоичное представление регистра: ${binaryPolynomial}`;
  const startStateMsg = `Начальное заполнение регистра: S = ${startNumber} = ${startState}`;
  const maxPeriodLength = `Максимальный период регистра: ${maxLengthFormula}, ${notExistingStateMsg}`;
  const maxRecSeqLength = `Максимальная длина рекуррентной последовательности для регистра: ${maxLengthFormula}`;

  const messagesArr = [
    registerParametersMsg,
    polynomialFormulaMsg,
    binaryPolynomialMsg,
    startStateMsg,
    maxPeriodLength,
    maxRecSeqLength
  ];

  console.log(messages.emptyLineMsg);
  for (let i = 0; i < messagesArr.length; i++) {
    console.log(messagesArr[i]);
  }
};

const printAllPeriodsData = (allPeriods) => {
  const numberOfPeriods = allPeriods.length;

  for (let i = 0; i < numberOfPeriods; i++) {
    const { periodTable, periodRecSeq, periodLength } = getPeriodData(allPeriods[i]);

    const recSeqMsg = `ЛРП: ${periodRecSeq}`;
    const periodLengthMsg = `Период равен ${periodLength}`;

    console.log(messages.emptyLineMsg);
    if (i === 0) {
      console.log('Моделирование работы ЛРР в виде таблицы смены его состояний:');
    } else {
      console.log('Моделирование работы ЛРР с неиспользованыым ранее состоянием в качестве начального:');
    }

    for (let j = 0; j < periodTable.length; j++) {
      const row = periodTable[j];
  
      console.log(row);
    }
    console.log(recSeqMsg);
    console.log(periodLengthMsg);
  }
};

const printRecSeqAnalysisResults = (allPeriods) => {
  const { 
    recSeq,
    recSeqPeriod,
    recSeqBalance,
    recSeqSeries,
    windowProperty
  } = getRecSeqAnalysis(allPeriods);

  const analysisMsg = 'Исследуем линейную рекуррентную последовательность (для периода максимальной длины):';
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

export { errors, messages, printRegisterParametersData, printAllPeriodsData, printRecSeqAnalysisResults };
