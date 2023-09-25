import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import config from '../../../../config';
import { getInfo } from '../../auth/login/loginApi';


const URL = `${config.BASE_URL}/user/openai/preferences/image`;

const initialState = {
  resulationPreference: [],
  artStylePreference: [],
  variantPreference: [],
  lightingStylePreference: [],
  imagePreferenceLoader: false,
};

export const getImagePreferences = createAsyncThunk(
  'imagePreference/getImagePreferences',
  async obj => {
    const {token} = obj;
    const response = await getInfo(token, URL);
    return response;
  },
);

const imagePreferences = createSlice({
  name: 'imagePreferences',
  initialState,
  extraReducers: builder => {
    builder.addCase(getImagePreferences.pending, state => {
      state.imagePreferenceLoader = true;
    });
    builder.addCase(getImagePreferences.fulfilled, (state, {payload}) => {
        const { status, records: { meta } = {} } =
        payload.response || {};
      state.imagePreferenceLoader = false;
      if(status.code==200){
        meta.forEach((item) => {
           item.key.toLowerCase()=='resulation'.toLowerCase() ?
           state.resulationPreference= item.value:
           item.key.toLowerCase()=='artStyle'.toLowerCase()?
           state.artStylePreference= item.value:
           item.key.toLowerCase()=='lightingStyle'.toLowerCase()?
           state.lightingStylePreference= item.value:
           item.key.toLowerCase()=='variant'.toLowerCase()?
           state.variantPreference=item.value:
           null
          });
      }
    });
    builder.addCase(getImagePreferences.rejected, state => {
      state.imagePreferenceLoader = false;
    });
  },
});
export default imagePreferences.reducer;
