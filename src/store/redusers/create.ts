import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { Task } from '../../types/task';
import type { RootState } from '../store'
import { createTask } from '../api/createTaskApi';

export const fetchCreateTask = createAsyncThunk('tasks/createTask', async (params: FormData) => {
  const response = await createTask(params);
  return response;
});

const createAdapter = createEntityAdapter();

const initialState = createAdapter.getInitialState({
  isError: false,
  isLoading: false,
  task: null as Task | null,
});

export const createTaskSlice = createSlice({
  name: 'create',
  initialState,
  reducers: {
    clearCreateState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.task = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCreateTask.pending, (state, action) => {
        state.isLoading = true;
        state.task = null;
      })
      .addCase(fetchCreateTask.fulfilled, (state, action) => {
        const status = action.payload.status as string
        if (status == "ok") {
          state.task = action.payload.message as Task | null;
          state.isLoading = false;
          state.isError = false;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.task = null;
        }
      })
      .addCase(fetchCreateTask.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.task = null;
      });
  },
});
  
export const { clearCreateState } = createTaskSlice.actions;

export const task = (state: RootState) => state.task;

export default createTaskSlice.reducer;
