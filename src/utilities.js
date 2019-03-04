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
  const returnArr = [];

  for (let i = 0; i < numberValues; i++) {
    const randInd = getRandomIndex(localArr);
    returnArr.push(localArr[randInd]);
    localArr.splice(randInd, 1);
  }

  return returnArr;
};

export const addLeadingZero = (number) => {
  return (number < 10) ? `0` + number : `` + number;
};
