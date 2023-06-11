import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/task';
import type { RootState } from '../store'
import { getTasks } from '../api/getTasksApi';
import { editTask } from '../api/editTaskApi';

export const fetchTasks = createAsyncThunk('tasks/getTasks', async (payload: { page: number, sort: string, direction: string }) => {
  const response = await getTasks(payload.page, payload.sort, payload.direction);
  return response.message;
});

export const fetchEditTask = createAsyncThunk('tasks/editTask', async (payload: { id: number, params: FormData }) => {
  const response = await editTask(payload.id, payload.params);
  return response;
});

const taskAdapter = createEntityAdapter();

const initialState = taskAdapter.getInitialState({
  isLoading: false,
  tasks: [] as Task[],
  page: 1 as number,
  sort: "id",
  direction: "desc",
  count: 0 as number,
  isEditLoading: false,
  isEditError: false,
  editedTask: null as Task | null,
})

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload as number;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload as string;
    },
    setDirection: (state, action: PayloadAction<string>) => {
      state.direction = action.payload as string;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload as Task;
      state.count = Number(state.count) + 1;
      const oldTasks = state.tasks;
      if (oldTasks.length > 2) oldTasks.pop();
      state.tasks = [...[newTask], ...oldTasks as Task[]];
    },
    getTaskById: (state, action: PayloadAction<number>) => {
      const id = action.payload as number;
      const task = state.tasks.filter((item: Task) => item.id == id);
      state.editedTask = task[0] as Task;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload as Task;
      const tasks = state.tasks;

      const replaceIndex = tasks.findIndex(
        task => task.id === action.payload.id
      );

      tasks.splice(replaceIndex, 1, {
        ...tasks[replaceIndex],
        ...newTask
      });
    },
    updateEditTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload as Task;
      state.editedTask = newTask
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = state.page == 1;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const tasksNew = action.payload.tasks as Task[];
        state.tasks = tasksNew;
        state.count = action.payload.total_task_count;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, state => {
        state.isLoading = false;
      })
      .addCase(fetchEditTask.pending, (state, action) => {
        state.isEditLoading = true;
        state.isEditError = false;
      })
      .addCase(fetchEditTask.fulfilled, (state, action) => {
        const status = action.payload.status as string
        if (status == "ok") {
          state.isEditLoading = false;
          state.isEditError = false;

          taskSlice.caseReducers.updateTask(state, { payload: state.editedTask as Task, type: action.type })
        } else {
          state.isEditLoading = false;
          state.isEditError = true;
        }
      })
      .addCase(fetchEditTask.rejected, state => {
        state.isEditLoading = false;
        state.isEditError = false;
      });
  },
});
  
export const { setPage, addTask, getTaskById, updateTask, updateEditTask, setDirection, setSort } = taskSlice.actions;

export const tasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
