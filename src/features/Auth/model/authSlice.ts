import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'src/entities/User';
import { getToken, removeToken, saveToken } from 'src/shared/lib/appLocalStorage';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: getToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        saveToken(action.payload);
      }
    },
    clearToken(state) {
      state.token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.signin.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      saveToken(action.payload.token);
    });

    builder.addMatcher(userApi.endpoints.signup.matchFulfilled, (state, action) => {
      state.token = action.payload.token;
      saveToken(action.payload.token);
    });
  },
});

export const { setToken: setStateToken } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
