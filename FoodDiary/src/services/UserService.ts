import firestore from '@react-native-firebase/firestore';
import {FirebaseCollections} from '../constants/FirebaseCollections';
import {UserSetting} from '../models/UserSettings';
import {User} from '../models/User';

class UserService {
  async createUser(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
  ) {
    return await firestore()
      .collection(FirebaseCollections.USERS)
      .doc(id)
      .set({firstName, lastName, email, id, settingsId: null, dailyInputs: []});
  }

  async createSettings(id: string, settings: UserSetting) {
    return await firestore()
      .collection(FirebaseCollections.USER_SETTINGS)
      .doc(id)
      .set({...settings, id: id});
  }

  async updateUser(id: string, values: {[x: string]: any}) {
    return await firestore()
      .collection(FirebaseCollections.USERS)
      .doc(id)
      .update(values);
  }

  async getUserById(id: string) {
    const res = await firestore()
      .collection(FirebaseCollections.USERS)
      .doc(id)
      .get();

    return res.data() as User;
  }

  async getUserSettingsById(id: string) {
    const res = await firestore()
      .collection(FirebaseCollections.USER_SETTINGS)
      .doc(id)
      .get();

    return res.data() as UserSetting;
  }

  async updateUserSettings(settings: UserSetting) {
    return await firestore()
      .collection(FirebaseCollections.USER_SETTINGS)
      .doc(settings.id)
      .update(settings);
  }
}

export default new UserService();
