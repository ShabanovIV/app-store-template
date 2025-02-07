import { createSlice } from '@reduxjs/toolkit';
import { getToken, removeToken, saveToken } from 'src/shared/lib/localStorage/tokenService';
import { userApi } from '../model/userApi';

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
    logout(state) {
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
export const selectToken = (state: RootState) => state.auth.token;
