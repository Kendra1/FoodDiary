import {DailyExercise} from '../../models/DailyInput';
import {DailyConsumable, DailyInput} from '../../models/DailyInput';
import {User} from '../../models/User';
import DailyInputService from '../../services/DailyInputService';
import UserService from '../../services/UserService';
import {setCurrentInput, setDailyInputs} from '../reducers/DailyInputReducer';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {RootState} from '../reducers/RootReducer';
import {setLoggedInUser} from '../reducers/AuthReducer';

export const getDailyInputs = (user: User) => (dispatch: any) => {
  DailyInputService.getDailyInputs(user).then((res: DailyInput[]) => {
    console.log(res);

    dispatch(setDailyInputs(res));
  });
};

export const getTodaysInput = (user: User) => (dispatch: any) => {
  DailyInputService.getDailyInput(user, new Date()).then(
    (res: DailyInput | undefined) => {
      dispatch(setCurrentInput(res));
    },
  );
};

export const addWater =
  (inputId: string | undefined, quantity: number) =>
  (_: any, getState: () => RootState) => {
    const user: User | undefined = getState().auth.loggedInUser;
    DailyInputService.addWater(inputId, quantity, user).then(() => {
      !inputId && updateUser(user, _);
      user && _(getTodaysInput(user));
      Toast.show({
        type: 'success',
        text1: 'Water added!',
      });
    });
  };

export const addConsumable =
  (inputId: string | undefined, consumable: DailyConsumable) =>
  (_: any, getState: () => RootState) => {
    const id: string = uuid.v4().toString();
    const user: User | undefined = getState().auth.loggedInUser;

    DailyInputService.addConsumable(inputId, id, consumable, user).then(() => {
      !inputId && updateUser(user, _);
      user && _(getTodaysInput(user));
      Toast.show({
        type: 'success',
        text1: `${consumable.consumable.type} added!`,
      });
    });
  };

export const addExercise =
  (inputId: string | undefined, exercise: DailyExercise) =>
  (_: any, getState: () => RootState) => {
    const id: string = uuid.v4().toString();
    const user: User | undefined = getState().auth.loggedInUser;
    DailyInputService.addExercise(inputId, id, exercise, user).then(() => {
      !inputId && updateUser(user, _);
      user && _(getTodaysInput(user));
      Toast.show({
        type: 'success',
        text1: 'Exercise added!',
      });
    });
  };

const updateUser = (user: User | undefined, dispatch: any) => {
  if (!user) {
    return;
  }
  UserService.getUserById(user.id).then((res: User) => {
    dispatch(setLoggedInUser(res));
  });
};
