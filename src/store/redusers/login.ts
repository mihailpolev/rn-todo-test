import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { Task } from '../../types/task';
import type { RootState } from '../store'
import { login } from '../api/loginApi';

export const fetchLogin = createAsyncThunk('login/login', async (params: FormData) => {
  const response = await login(params);
  return response;
});

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
  isError: false,
  isLoading: false,
  token: null as string | null,
});

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginState: (state) => {
      state.isLoading = false;
      state.isError = false;
    },
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
        state.token = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const status = action.payload.status as string
        if (status == "ok") {
          state.token = action.payload.message.token as string | null;
          state.isLoading = false;
          state.isError = false;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.token = null;
        }
      })
      .addCase(fetchLogin.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.token = null;
      });
  },
});
  
export const { clearLoginState, logout } = loginSlice.actions;

export const token = (state: RootState) => state.login.token;

export default loginSlice.reducer;
