import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import config from "../../../../config";
import { getInfo } from "../../auth/login/loginApi";

const URL = `${config.BASE_URL}/user/openai/preferences/code`;

const initialState={
    languagePreference: [],
    codeLabelPreference: [],  
    codePreferenceLoader: false  
}

export const getCodePreferences = createAsyncThunk(
    'codePreference/getCodePreference',
    async obj =>{
        const {token} = obj;
        const response = await getInfo(token, URL);
        return response;
    }
)

const codePreferences = createSlice({
    name: 'codePreference',
    initialState,
    extraReducers: builder => {
        builder.addCase(getCodePreferences.pending, state =>{
            state.codePreferenceLoader = true;
        });
        builder.addCase(getCodePreferences.fulfilled, (state, {payload})=>{
            const {status,  records: {meta}={}}= payload.response || {};
            state.codePreferenceLoader = false;
            if(status.code ===200){
                meta.forEach((item) => {
                    item.key.toLowerCase()=='language'.toLowerCase() ?
                    state.languagePreference= item.value:
                    item.key.toLowerCase()=='codeLabel'.toLowerCase()?
                    state.codeLabelPreference= item.value:
                    null
                   });
            }
        });
        builder.addCase(getCodePreferences.rejected, state=>{
            state.codePreferenceLoader = false;
        })
    }
})

export default codePreferences.reducer;