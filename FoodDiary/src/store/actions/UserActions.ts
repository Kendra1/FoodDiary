import {UserSetting} from '../../models/UserSettings';
import UserService from '../../services/UserService';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {setRegisteringUser, setUserSettings} from '../reducers/AuthReducer';

export const createUserSettings =
  (userId: string, settings: UserSetting) => (dispatch: any) => {
    const id: string = uuid.v4().toString();
    UserService.createSettings(id, settings)
      .then(() => {
        UserService.updateUser(userId, {settingsId: id})
          .then(() => {
            dispatch(setRegisteringUser(undefined));
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Something went wrong!',
            });
          });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
        });
      });
  };

export const updateUserSettings =
  (settings: UserSetting) => (dispatch: any) => {
    UserService.updateUserSettings(settings)
      .then(() => {
        dispatch(setUserSettings(settings));
        Toast.show({
          type: 'success',
          text1: "You've successfully updated your settings!",
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
        });
      });
  };
