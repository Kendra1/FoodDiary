import {FirebaseCollections} from '../constants/FirebaseCollections';
import {Consumable, ConsumableSubtype} from '../models/Consumable';
import firestore from '@react-native-firebase/firestore';

class ConsumableService {
  async getConsumables(type: ConsumableSubtype) {
    const res = await firestore()
      .collection(FirebaseCollections.CONSUMABLE)
      .where('type', '==', type)
      .get();

    const data = res.docs.map(val => val.data());

    return data as Array<Consumable>;
  }

  async addConsumable(id: string, item: Consumable) {
    return await firestore()
      .collection(FirebaseCollections.CONSUMABLE)
      .doc(id)
      .set({...item, id: id});
  }
}

export default new ConsumableService();
