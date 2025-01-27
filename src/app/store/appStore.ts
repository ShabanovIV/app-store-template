import { configureStore } from '@reduxjs/toolkit';
import { userApi } from 'src/entities/User/model/userApi';
import { authReducer } from 'src/features/Auth';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

declare global {
  type RootState = ReturnType<typeof appStore.getState>;
  type AppDispatch = typeof appStore.dispatch;
}
