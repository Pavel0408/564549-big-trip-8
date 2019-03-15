import {
  getRandomNumber
} from "../utilities";

export const generateImages = () => {
  const IMAGE_HEIGHT = 133;
  const MAX_IMAGE_WIDTH = 400;
  const MIN_IMAGE_WIDTH = 44;
  const MAX_IMAGES_NUMBER = 4;
  const MIN_IMAGES_NUMBER = 1;

  const imagesNumber = getRandomNumber(MIN_IMAGES_NUMBER, MAX_IMAGES_NUMBER);
  return new Array(imagesNumber)
    .fill(``)
    .map(() => {
      const imageWidth = Math.floor(getRandomNumber(MIN_IMAGE_WIDTH, MAX_IMAGE_WIDTH));
      return `<img src="http://picsum.photos/${imageWidth}/${IMAGE_HEIGHT}?r=${Math.random()}" alt="picture from place" class="point__destination-image">`;
    });
};
