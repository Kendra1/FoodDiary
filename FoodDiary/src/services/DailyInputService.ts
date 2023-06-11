import firestore from '@react-native-firebase/firestore';
import {FirebaseCollections} from '../constants/FirebaseCollections';
import {User} from '../models/User';
import {DailyConsumable, DailyExercise, DailyInput} from '../models/DailyInput';
import uuid from 'react-native-uuid';

class DailyInputService {
  async getDailyInputs(user: User) {
    if (user.dailyInputs.length === 0) {
      return [];
    }

    const res = await firestore()
      .collection(FirebaseCollections.DAILY_INPUTS)
      .where('id', 'in', user.dailyInputs)
      .get();

    const data = res.docs.map(val => val.data());

    return data as Array<DailyInput>;
  }

  async getDailyInput(user: User, date: Date) {
    if (user.dailyInputs.length === 0) {
      return undefined;
    }

    const res = await firestore()
      .collection(FirebaseCollections.DAILY_INPUTS)
      .where('id', 'in', user.dailyInputs)
      .where('date', '==', date.toLocaleDateString())
      .get();

    if (!res || !res.docs[0]) {
      return undefined;
    }

    return res.docs[0].data() as DailyInput;
  }

  async addWater(
    inputId: string | undefined,
    waterQuantity: number,
    user: User | undefined,
  ) {
    if (!inputId) {
      const newId: string = uuid.v4().toString();
      const newDailyInput: DailyInput = {
        id: newId,
        date: new Date().toLocaleDateString(),
        calories: 0,
        water: waterQuantity,
        exercises: [],
        consumables: [],
      };

      await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(newId)
        .set(newDailyInput);

      return await firestore()
        .collection(FirebaseCollections.USERS)
        .doc(user?.id)
        .update({
          dailyInputs: firestore.FieldValue.arrayUnion(newId),
        });
    } else {
      return await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(inputId)
        .update({
          water: waterQuantity,
        });
    }
  }

  async addConsumable(
    inputId: string | undefined,
    consumableId: string,
    consumable: DailyConsumable,
    user: User | undefined,
  ) {
    if (!inputId) {
      const newId: string = uuid.v4().toString();
      const newDailyInput: DailyInput = {
        id: newId,
        date: new Date().toLocaleDateString(),
        calories: consumable.consumable.calories * (consumable.quantity / 100),
        water: 0,
        exercises: [],
        consumables: [{...consumable, id: consumableId}],
      };

      await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(newId)
        .set(newDailyInput);

      return await firestore()
        .collection(FirebaseCollections.USERS)
        .doc(user?.id)
        .update({
          dailyInputs: firestore.FieldValue.arrayUnion(newId),
        });
    } else {
      const res = await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(inputId)
        .get();

      const currentInput: DailyInput = res.data() as DailyInput;

      return await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(inputId)
        .update({
          consumables: firestore.FieldValue.arrayUnion({
            ...consumable,
            id: consumableId,
          }),
          calories:
            currentInput.calories +
            consumable.consumable.calories * (consumable.quantity / 100),
        });
    }
  }

  async addExercise(
    inputId: string | undefined,
    exerciseId: string,
    exercise: DailyExercise,
    user: User | undefined,
  ) {
    if (!inputId) {
      const newId: string = uuid.v4().toString();
      const newDailyInput: DailyInput = {
        id: newId,
        date: new Date().toLocaleDateString(),
        calories: 0,
        water: 0,
        exercises: [{...exercise, id: exerciseId}],
        consumables: [],
      };

      await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(newId)
        .set(newDailyInput);

      return await firestore()
        .collection(FirebaseCollections.USERS)
        .doc(user?.id)
        .update({
          dailyInputs: firestore.FieldValue.arrayUnion(newId),
        });
    } else {
      const res = await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(inputId)
        .get();

      const currentInput: DailyInput = res.data() as DailyInput;
      return await firestore()
        .collection(FirebaseCollections.DAILY_INPUTS)
        .doc(inputId)
        .update({
          exercises: firestore.FieldValue.arrayUnion({
            ...exercise,
            id: exerciseId,
          }),
          calories:
            currentInput.calories - exercise.excercise.calories * exercise.time,
        });
    }
  }
}

export default new DailyInputService();
