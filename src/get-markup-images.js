export const getMarkupImages = (images) => {
  const pictures = images.map((picture) => {
    return `<img src="${picture.src}" alt="picture from place" class="point__destination-image">`;
  });

  return pictures;
};
