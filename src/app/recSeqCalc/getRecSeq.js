const getRecSeq = (period) => {
  const periodLength = period.length;

  let recSeq = '';

  for (let i = 0; i < periodLength; i++) {
    recSeq = period[i].sum + recSeq;
  }

  return recSeq;
};

export { getRecSeq };
