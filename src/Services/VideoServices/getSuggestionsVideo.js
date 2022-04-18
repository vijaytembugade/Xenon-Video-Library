import axios from "axios";

export const getSuggestionsVideo = async (author, id, creator) => {
  try {
    const response = await axios.get("/api/videos");

    const suggestions = response.data.videos.filter(
      (video) =>
        video._id !== id &&
        (video.author === author || video.creator === creator)
    );

    return suggestions.slice(0, 3);
  } catch (error) {
    console.log(error);
  }
};
