export const getAllCreator = (videos) => {
  return videos.reduce((acc, curr) => {
    if (!acc.includes(curr.creator)) {
      return [...acc, curr.creator];
    }
    return acc;
  }, []);
};
