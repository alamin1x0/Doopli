import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';

const initialState = {
  imageList: [],
  loading: false,
  isRefresh: false,
  nextPageUrl: "",
  loadMore: false,
};

export const getImageHistory = createAsyncThunk(
  'image/getImageHistory',
  async obj => {
    const URL = `${config.BASE_URL}/user/openai/image/list`;
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);
export const getMoreImageHistory = createAsyncThunk(
  'image/getMoreImageHistory',
  async obj => {
    const {token,nextPageUrl} = obj;
    const response = await getInfo(token, nextPageUrl);
    return response;
  },
);

const getImages = createSlice({
  name: 'imageHistory',
  initialState,
  extraReducers: builder => {
    builder.addCase(getImageHistory.pending, state => {
      state.loading = true;
    });
    builder.addCase(getImageHistory.fulfilled, (state, {payload}) => {
      const { status, records: {data, links } = {} } =
      payload.response || {};
      state.loading = false;
      state.imageList = data;
      if (status?.code == 200) {
        state.nextPageUrl = links?.next;
    }
    });
    builder.addCase(getImageHistory.rejected, state => {
      state.loading = false;
    });
    builder.addCase(getMoreImageHistory.pending, state => {
      state.loadMore = true;
    });
    builder.addCase(getMoreImageHistory.fulfilled, (state, {payload}) => {
      const { status, records: { data,links } = {} } =
      payload.response || {};
      state.loadMore = false;
      state.imageList =[...state.imageList,...data];
      if (status?.code == 200) {
        state.nextPageUrl = links?.next;
    }
    });
    builder.addCase(getMoreImageHistory.rejected, state => {
      state.loadMore = false;
    });
  },
});

export default getImages.reducer;
