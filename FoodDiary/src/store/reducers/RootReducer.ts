import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import DailyInputReducer from './DailyInputReducer';
import ConsumableReducer from './ConsumableReducer';
import ExerciseReducer from './ExerciseReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  dailyInput: DailyInputReducer,
  consumables: ConsumableReducer,
  exercises: ExerciseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
