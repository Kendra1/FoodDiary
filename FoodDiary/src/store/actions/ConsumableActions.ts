import {ConsumableType} from '../../constants/ConsumableType';
import {Consumable} from '../../models/Consumable';
import ConsumableService from '../../services/ConsumableService';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import {
  setConsumablesDrink,
  setConsumablesFood,
} from '../reducers/ConsumableReducer';

export const getConsumables = (type: ConsumableType) => (dispatch: any) => {
  switch (type) {
    case ConsumableType.FOOD: {
      ConsumableService.getConsumables(ConsumableType.FOOD).then(
        (res: Array<Consumable>) => {
          dispatch(setConsumablesFood(res));
        },
      );
    }
    case ConsumableType.DRINK: {
      ConsumableService.getConsumables(ConsumableType.DRINK).then(
        (res: Array<Consumable>) => {
          dispatch(setConsumablesDrink(res));
        },
      );
    }
  }
};

export const createConsumable = (item: Consumable) => () => {
  const id: string = uuid.v4().toString();
  ConsumableService.addConsumable(id, item)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: `${item.type} successfully added!`,
      });
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
      });
    });
};
