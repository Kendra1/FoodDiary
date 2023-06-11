import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../models/User';
import {UserSetting} from '../../models/UserSettings';

interface AuthState {
  isLoggedIn: boolean;
  loggedInUser: User | undefined;
  initiateSetup: boolean;
  registeringUser: User | undefined;
  settings: UserSetting | undefined;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loggedInUser: undefined,
  initiateSetup: false,
  registeringUser: undefined,
  settings: undefined,
};

const authSlice = createSlice({
  initialState,
  name: 'authReducer',
  reducers: {
    setLoggedIn(state, {payload}: PayloadAction<boolean>) {
      state.isLoggedIn = payload;
    },
    setInitiateSetup(state, {payload}: PayloadAction<boolean>) {
      state.initiateSetup = payload;
    },
    setRegisteringUser(state, {payload}: PayloadAction<User | undefined>) {
      state.registeringUser = payload;
    },
    setLoggedInUser(state, {payload}: PayloadAction<User | undefined>) {
      state.loggedInUser = payload;
    },
    setUserSettings(state, {payload}: PayloadAction<UserSetting | undefined>) {
      state.settings = payload;
    },
  },
});

export const {
  setLoggedIn,
  setInitiateSetup,
  setRegisteringUser,
  setLoggedInUser,
  setUserSettings,
} = authSlice.actions;

export default authSlice.reducer;
