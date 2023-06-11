import {FirebaseCollections} from '../constants/FirebaseCollections';
import {Exercise} from '../models/Exercise';
import firestore from '@react-native-firebase/firestore';

class ExerciseService {
  async getExercises() {
    const res = await firestore()
      .collection(FirebaseCollections.EXERCISE)
      .get();

    const data = res.docs.map(val => val.data());

    return data as Array<Exercise>;
  }

  async addExercise(id: string, item: Exercise) {
    return await firestore()
      .collection(FirebaseCollections.EXERCISE)
      .doc(id)
      .set({...item, id: id});
  }
}

export default new ExerciseService();
