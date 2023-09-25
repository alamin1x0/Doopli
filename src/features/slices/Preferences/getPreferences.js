import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';

const URL = `${config.BASE_URL}/preferences`;
const initialState = {
  Preferences: [],
  PreferenceLoader: false,
  test: false
};

export const getPreferences = createAsyncThunk(
  'preferences/getPreferences',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    const {status: {code} = {}, records} = response?.response;
    return records;
  },
);

const preferences = createSlice({
  name: 'preferences',
  initialState,
  extraReducers: builder => {
    builder.addCase(getPreferences.pending, state => {
      state.PreferenceLoader = true;
    });
    builder.addCase(getPreferences.fulfilled, (state, {payload}) => {
      state.PreferenceLoader = false;
      state.Preferences = payload;
    });
    builder.addCase(getPreferences.rejected, state => {
      state.PreferenceLoader = false;
    });
  },
});
export default preferences.reducer;
