export const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Случайный индекс массива
export const getRandomIndex = (arr) => {
  return getRandomNumber(0, arr.length - 1);
};

// Случайное значение из массива
export const getRandomValue = (arr) => {
  return arr[getRandomIndex(arr)];
};

export const getFewValues = (arr, minNumberValues, maxNumberValues) => {
  const localArr = arr.slice();
  const numberValues = getRandomNumber(minNumberValues, maxNumberValues);

  return new Array(numberValues)
    .fill(``)
    .map(() => {
      const randInd = getRandomIndex(localArr);
      return localArr.splice(randInd, 1);
    });
};

export const addLeadingZero = (number) => {
  return (number < 10) ? `0` + number : `` + number;
};

export const calculateInterval = (start, end) => {
  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_MINUTE = 1000 * 60;

  const intervalInMs = end.getTime() - start.getTime();
  const hours = Math.floor(intervalInMs / MS_IN_HOUR);
  const minutes = Math.floor(intervalInMs % MS_IN_HOUR / MS_IN_MINUTE);

  return {
    hours,
    minutes
  };
};
