export const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// случайный индекс массива
export const getRandomIndex = (arr) => {
  return getRandomNumber(0, arr.length - 1);
};

// случайное значение из массива
export const getRandomValue = (arr) => {
  const randInd = getRandomIndex(arr);
  const val = arr[randInd];
  return val;
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
