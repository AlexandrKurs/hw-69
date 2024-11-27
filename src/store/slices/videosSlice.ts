import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getOneVideoById, getSimilarVideos} from "../thunks/videosThunks.ts";
import {RootState} from "../../app/store.ts";

interface VideosState {
  videos: IVideo[];
  oneVideo: IFullFirm | null;
  isFetching: boolean;
}

const initialState: VideosState = {
  videos: [],
  oneVideo: null,
  isFetching: false
};

export const selectAllSimilarVideos = (state: RootState) => state.films.videos;
export const selectIsFetchingOneVideo = (state: RootState) => state.films.isFetching;
export const selectOneVideo = (state: RootState) => state.films.oneVideo;


export const VideosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearOneVideo: (state) => {
      state.oneVideo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSimilarVideos.fulfilled, (state, action: PayloadAction<IVideo[]>) => {
        state.videos = action.payload;
      })
      .addCase(getOneVideoById.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getOneVideoById.fulfilled, (state, action: PayloadAction<IFullFirm | null>) => {
        state.isFetching = false;
        state.oneVideo = action.payload;
      })
      .addCase(getOneVideoById.rejected, (state) => {
        state.isFetching = false;
      })
  }
});


export const videosReducer = VideosSlice.reducer;
export const {clearOneVideo} = VideosSlice.actions;