import {User} from '../../models/User';
import {UserSetting} from '../../models/UserSettings';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import {
  setInitiateSetup,
  setLoggedIn,
  setLoggedInUser,
  setRegisteringUser,
  setUserSettings,
} from '../reducers/AuthReducer';
import Toast from 'react-native-toast-message';

export const login = (email: string, password: string) => (dispatch: any) => {
  AuthService.login(email, password)
    .then(res => {
      console.log(res);
      dispatch(setLoggedIn(true));
      UserService.getUserById(res.user.uid).then((response: User) => {
        dispatch(setLoggedInUser(response));
        UserService.getUserSettingsById(response.settingsId).then(
          (settings: UserSetting) => {
            dispatch(setUserSettings(settings));
          },
        );
      });
    })
    .catch(error => {
      if (error.code === 'auth/invalid-email') {
        Toast.show({
          type: 'error',
          text1: 'Email is not correct!',
        });
      }
      if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: 'User with this email is not found!',
        });
      }
      if (error.code === 'auth/wrong-password') {
        Toast.show({
          type: 'error',
          text1: 'Password is not correct!',
        });
      }
    });
};

export const logout = () => (dispatch: any) => {
  dispatch(setLoggedIn(false));
};

export const register =
  (firstName: string, lastName: string, email: string, password: string) =>
  (dispatch: any) => {
    AuthService.register(email, password)
      .then((data: any) => {
        UserService.createUser(data.user.uid, firstName, lastName, email)
          .then(() => {
            const newUser: User = {
              id: data.user.uid,
              email: email,
              firstName: firstName,
              lastName: lastName,
              settingsId: '',
              dailyInputs: [],
            };

            dispatch(setRegisteringUser(newUser));
            dispatch(setInitiateSetup(true));
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show({
            type: 'error',
            text1: 'Email is already in use!',
          });
        }
        if (error.code === 'auth/invalid-email') {
          Toast.show({
            type: 'error',
            text1: 'Invalid email!',
          });
        }
      });
  };

export const resetPassword = (email: string) => () => {
  AuthService.resetPassword(email)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Reset password email successfully sent!',
      });
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Toast.show({
          type: 'error',
          text1: "We couldn't find a user with this email.",
        });
      } else {
        Toast.show({
          type: 'error',
          text1: "Something went wrong, we're sorry for the incovenience.",
        });
      }
    });
};
