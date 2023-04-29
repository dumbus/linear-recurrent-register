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

export { getRawColumns };
