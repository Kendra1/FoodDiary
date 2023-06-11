import auth from '@react-native-firebase/auth';

class AuthService {
  async login(email: string, password: string) {
    return await auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await auth().signOut();
  }

  async register(email: string, password: string) {
    return await auth().createUserWithEmailAndPassword(email, password);
  }

  async resetPassword(email: string) {
    return await auth().sendPasswordResetEmail(email);
  }
}

export default new AuthService();
