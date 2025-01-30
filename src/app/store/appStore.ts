import { configureStore } from '@reduxjs/toolkit';
import { userApi, authReducer, profileApi } from 'src/entities/User/';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(profileApi.middleware),
  devTools: true,
});

declare global {
  type RootState = ReturnType<typeof appStore.getState>;
  type AppDispatch = typeof appStore.dispatch;
}
