export const generateNewPointData = () => {
  return {
    title: ``,
    type: `check`,
    offers: new Set([]),
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
