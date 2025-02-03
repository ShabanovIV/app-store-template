import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from 'src/entities/Category/model/categoryApi';
import { userApi, authReducer, profileApi } from 'src/entities/User/';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(profileApi.middleware)
      .concat(categoryApi.middleware),
  devTools: true,
});

declare global {
  type RootState = ReturnType<typeof appStore.getState>;
  type AppDispatch = typeof appStore.dispatch;
}
