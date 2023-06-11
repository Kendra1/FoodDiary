import {Consumable} from './Consumable';
import {Exercise} from './Exercise';

export interface DailyConsumable {
  id: string;
  consumable: Consumable;
  quantity: number;
}

export interface DailyExercise {
  id: string;
  excercise: Exercise;
  time: number;
}

export interface DailyInput {
  id: string;
  date: Date | string;
  calories: number;
  water: number;
  exercises: Array<DailyExercise>;
  consumables: Array<DailyConsumable>;
}
