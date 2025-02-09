import { configureStore } from '@reduxjs/toolkit';
import { categoryApi } from 'src/entities/Category';
import { orderApi } from 'src/entities/Order/';
import { productApi } from 'src/entities/Product';
import { userApi, authReducer, profileApi } from 'src/entities/User/';
import { cartReducer } from 'src/features/Cart';

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(profileApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
  devTools: true,
});

declare global {
  type RootState = ReturnType<typeof appStore.getState>;
  type AppDispatch = typeof appStore.dispatch;
}
