import {
  getRandomNumber
} from "../utilities";

export const generateImages = () => {
  const imagesNumber = getRandomNumber(1, 4);
  return new Array(imagesNumber)
    .fill(``)
    .map(() => {
      const width = Math.floor(getRandomNumber(44, 400));
      const height = 133;
      return `<img src="http://picsum.photos/${width}/${height}?r=${Math.random()}" alt="picture from place" class="point__destination-image">`;
    });
};
