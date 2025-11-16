
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tasks'], 
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['tasks.pinnedIds'],
      },
    }),
});

export const persistor = persistStore(store);