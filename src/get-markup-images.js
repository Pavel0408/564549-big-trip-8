export const getMarkupImages = (images) => {
  if (images && images.length > 0) {
    const pictures = images.map((picture) => {
      return `<img src="${
        picture.src
      }" alt="picture from place" class="point__destination-image">`;
    });

    return pictures;
  }

  return ``;
};
