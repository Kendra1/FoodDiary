import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {AppRoute} from './routes';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import FinishSetupScreen from '../screens/Auth/FinishSetupScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
const Stack = createNativeStackNavigator();

export type AuthNavigatorParams = {
  [AppRoute.LOGIN_SCREEN]: any;
  [AppRoute.REGISTER_SCREEN]: any;
  [AppRoute.FINISH_SETUP_SCREEN]: any;
  [AppRoute.RESET_PASSWORD_SCREEN]: any;
};

export interface AuthenticationProps<Screen extends keyof AuthNavigatorParams> {
  navigation: NativeStackNavigationProp<AuthNavigatorParams, Screen>;
  route: RouteProp<AuthNavigatorParams, Screen>;
}

export type LoginScreenProps = AuthenticationProps<AppRoute.LOGIN_SCREEN>;
export type RegisterScreenProps = AuthenticationProps<AppRoute.REGISTER_SCREEN>;
export type FinishSetupScreenProps =
  AuthenticationProps<AppRoute.FINISH_SETUP_SCREEN>;
export type ResetPasswordScreenProps =
  AuthenticationProps<AppRoute.RESET_PASSWORD_SCREEN>;

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.LOGIN_SCREEN}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={AppRoute.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={AppRoute.REGISTER_SCREEN}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={AppRoute.FINISH_SETUP_SCREEN}
        component={FinishSetupScreen}
      />
      <Stack.Screen
        name={AppRoute.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};
