import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';

const URL = `${config.BASE_URL}/user/openai/preferences/content`;

const initialState = {
  languagePreference: [],
  tonePreference: [],
  variantPreference: [],
  temperaturePreference: [],
  textPreferenceLoader: false,
};

export const getTextPreferences = createAsyncThunk(
  'textPreference/getTextPreferences',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const textPreferences = createSlice({
  name: 'textPreferences',
  initialState,
  extraReducers: builder => {
    builder.addCase(getTextPreferences.pending, state => {
      state.textPreferenceLoader = true;
    });
    builder.addCase(getTextPreferences.fulfilled, (state, {payload}) => {
        const { status, records: { meta } = {} } =
        payload.response || {};
      state.textPreferenceLoader = false;
      if(status.code==200){
        meta.forEach((item) => {
           item.key.toLowerCase()=='language'.toLowerCase() ?
           state.languagePreference= item.value:
           item.key.toLowerCase()=='tone'.toLowerCase()?
           state.tonePreference= item.value:
           item.key.toLowerCase()=='variant'.toLowerCase()?
           state.variantPreference= item.value:
           item.key.toLowerCase()=='temperature'.toLowerCase()?
           state.temperaturePreference=item.value:
           null
          });
      }
    });
    builder.addCase(getTextPreferences.rejected, state => {
      state.textPreferenceLoader = false;
    });
  },
});
export default textPreferences.reducer;
