export const generateNewPointData = () => {
  return {
    title: ``,
    type: `sightseeing`,
    offers: [],
    description: ``,
    time: {
      start: new Date(),
      end: new Date()
    },
    price: ``,
    images: [],
    destination: ``,
    id: ``,
    isFavorite: false
  };
};
