import {ConsumableType} from '../constants/ConsumableType';

export type ConsumableSubtype = ConsumableType.FOOD | ConsumableType.DRINK;

export interface Consumable {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  type: ConsumableSubtype;
}
