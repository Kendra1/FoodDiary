import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DailyInput} from '../../models/DailyInput';

interface DailyInputState {
  currentInput: DailyInput | undefined;
  dailyInputs: DailyInput[];
}

const initialState: DailyInputState = {
  currentInput: undefined,
  dailyInputs: [],
};

const dailyInputSlice = createSlice({
  initialState,
  name: 'dailyInputReducer',
  reducers: {
    setCurrentInput(state, {payload}: PayloadAction<DailyInput | undefined>) {
      state.currentInput = payload;
    },
    setDailyInputs(state, {payload}: PayloadAction<DailyInput[]>) {
      state.dailyInputs = payload;
    },
  },
});

export const {setCurrentInput, setDailyInputs} = dailyInputSlice.actions;

export default dailyInputSlice.reducer;
