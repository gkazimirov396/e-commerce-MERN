import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('auth_token') ?? null,
    user: localStorage.getItem('auth_token')
      ? jwtDecode(localStorage.getItem('auth_token'))
      : null,
    isLoggedIn: !!localStorage.getItem('auth_token'),
  },
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;

      if (accessToken) {
        state.token = accessToken;
        state.user = jwtDecode(accessToken);
        state.isLoggedIn = true;
        localStorage.setItem('auth_token', accessToken);
      } else {
        console.log('No token provided');
      }
    },
    logOut: state => {
      if (state.isLoggedIn) {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem('auth_token');
      }
    },
  },
});

export const {
  reducer: authReducer,
  actions: { setCredentials, logOut },
} = authSlice;

export const selectCurrentUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
