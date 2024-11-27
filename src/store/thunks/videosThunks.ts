import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from '../../axiosAPI.ts';


export const getSimilarVideos = createAsyncThunk<IVideo[], string>(
  'videos/getSimilarVideos',
  async (inputValue) => {
    const res = await axiosAPI<IVideoAPI[]>('/search/shows?q=' + inputValue);
    const videosList = res.data;
    if (!videosList) return [];

    return videosList.map(video => ({
      id: video.show.id,
      label: video.show.name,
    }));
  }
)

export const getOneVideoById = createAsyncThunk<IFullFirm | null, string>(
  'videos/getOneVideoById',
  async (id) => {
    const res = await axiosAPI<IFullFirm>('/shows/' + id);
    if (!res.data) return null;
    return res.data;
  }
)