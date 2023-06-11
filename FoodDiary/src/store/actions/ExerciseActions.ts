import {Exercise} from '../../models/Exercise';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import ExerciseService from '../../services/ExerciseService';
import {setExercises} from '../reducers/ExerciseReducer';

export const getExercises = () => (dispatch: any) => {
  ExerciseService.getExercises().then((res: Array<Exercise>) => {
    dispatch(setExercises(res));
  });
};

export const createExercise = (item: Exercise) => () => {
  const id: string = uuid.v4().toString();
  ExerciseService.addExercise(id, item)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Exercise successfully added!',
      });
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    });
};
