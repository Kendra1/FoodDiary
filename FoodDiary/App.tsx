import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {AuthNavigator} from './src/navigation/AuthNavigator';
import {RootTabNavigator} from './src/navigation/RootTabNavigator';
import {logout} from './src/store/actions/AuthActions';
import {RootState} from './src/store/reducers/RootReducer';

function App(): JSX.Element {
  const dispatch = useDispatch<any>();
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  const onAuthStateChanged = (authUser: FirebaseAuthTypes.User | null) => {
    if (!authUser) {
      dispatch(logout());
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return (
    <>
      <NavigationContainer>
        {isLoggedIn ? <RootTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <Toast topOffset={60} />
    </>
  );
}

export default App;
