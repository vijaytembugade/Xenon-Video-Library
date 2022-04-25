export const getAllAuthors = (videos) => {
  return videos.reduce((acc, curr) => {
    if (!acc.includes(curr.author)) {
      return [...acc, curr.author];
    }
    return acc;
  }, []);
};
