import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import type { RootState } from '../../redux/store';

type languageState = {
    languageDefault: {
        value: string,
        label: string
    }
}

const initialState: languageState = {
    languageDefault: {
        value: 'vi',
        label: 'Tiếng Việt'
    },
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<any, string>) => {
            state.languageDefault = action.payload || {};
        },
    },
});

export const {
    changeLanguage
} = languageSlice.actions;

export const selectLanguage = (state: RootState) => state.language.languageDefault;

export default languageSlice.reducer;