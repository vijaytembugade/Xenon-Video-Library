import axios from "axios";

export const deleteVideoFromPlaylistService = async (
  playListId,
  videoId,
  token
) => {
  try {
    const response = await axios.delete(
      `/api/user/playlists/${playListId}/${videoId}`,
      {
        headers: { authorization: token },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
