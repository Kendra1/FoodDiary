import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise} from '../../models/Exercise';

interface ExerciseState {
  exercises: Array<Exercise>;
}

const initialState: ExerciseState = {
  exercises: [],
};

const exercisesSlice = createSlice({
  initialState,
  name: 'exercisesReducer',
  reducers: {
    setExercises(state, {payload}: PayloadAction<Array<Exercise>>) {
      state.exercises = payload;
    },
  },
});

export const {setExercises} = exercisesSlice.actions;

export default exercisesSlice.reducer;
