import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './redusers/task';
import createTaskSlice from './redusers/create';
import loginSlice from './redusers/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedLoginReducer = persistReducer(persistConfig, loginSlice);

export const store = configureStore({
  reducer: {
    task: taskSlice,
    create: createTaskSlice,
    login: persistedLoginReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch