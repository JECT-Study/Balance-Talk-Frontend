/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TokenState {
  accessToken: string | undefined;
  isRefreshing: boolean;
}

const initialState: TokenState = {
  accessToken: undefined,
  isRefreshing: true,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isRefreshing = false;
    },
    deleteToken: (state) => {
      state.accessToken = undefined;
      state.isRefreshing = false;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    },
  },
});

export const { setToken, deleteToken, setRefreshing } = tokenSlice.actions;

export const tokenActions = tokenSlice.actions;

export const selectAccessToken = (state: { token: TokenState }) =>
  state.token.accessToken;

export const selectIsRefreshing = (state: { token: TokenState }) =>
  state.token.isRefreshing;

export default tokenSlice.reducer;
