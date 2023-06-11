import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Consumable} from '../../models/Consumable';

interface ConsumableState {
  consumablesFood: Array<Consumable>;
  consumablesDrink: Array<Consumable>;
}

const initialState: ConsumableState = {
  consumablesFood: [],
  consumablesDrink: [],
};

const consumablesSlice = createSlice({
  initialState,
  name: 'consumablesReducer',
  reducers: {
    setConsumablesFood(state, {payload}: PayloadAction<Array<Consumable>>) {
      state.consumablesFood = payload;
    },
    setConsumablesDrink(state, {payload}: PayloadAction<Array<Consumable>>) {
      state.consumablesDrink = payload;
    },
  },
});

export const {setConsumablesFood, setConsumablesDrink} =
  consumablesSlice.actions;

export default consumablesSlice.reducer;
