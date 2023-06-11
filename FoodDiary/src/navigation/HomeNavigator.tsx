import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {ConsumableType} from '../constants/ConsumableType';
import AddConsumableScreen from '../screens/Tab/AddConsumableScreen';
import HomeScreen from '../screens/Tab/HomeScreen';
import {AppRoute} from './routes';
import AddWaterScreen from '../screens/Tab/AddWaterScreen';
import AddExerciseScreen from '../screens/Tab/AddExerciseScreen';
import AddNewConsumableScreen from '../screens/Tab/AddNewConsumableScreen';
import AddNewExcerciseScreen from '../screens/Tab/AddNewExcerciseScreen';
const Stack = createNativeStackNavigator<HomeNavigatorParams>();

export type HomeNavigatorParams = {
  [AppRoute.HOME_SCREEN]: any;
  [AppRoute.ADD_CONSUMABLE_SCREEN]: {
    type: ConsumableType;
  };
  [AppRoute.ADD_NEW_CONSUMABLE_SCREEN]: {
    type: ConsumableType;
  };
  [AppRoute.ADD_WATER_SCREEN]: {
    remainder: number | undefined;
  };
  [AppRoute.ADD_EXERCISE_SCREEN]: any;
  [AppRoute.ADD_NEW_EXERCISE_SCREEN]: any;
};

export interface HomeNavigatorProps<Screen extends keyof HomeNavigatorParams> {
  navigation: NativeStackNavigationProp<HomeNavigatorParams, Screen>;
  route: RouteProp<HomeNavigatorParams, Screen>;
}

export type HomeScreenProps = HomeNavigatorProps<AppRoute.HOME_SCREEN>;
export type AddConsumableScreenProps =
  HomeNavigatorProps<AppRoute.ADD_CONSUMABLE_SCREEN>;
export type AddNewConsumableScreenProps =
  HomeNavigatorProps<AppRoute.ADD_NEW_CONSUMABLE_SCREEN>;
export type AddWaterScreenProps = HomeNavigatorProps<AppRoute.ADD_WATER_SCREEN>;
export type AddExerciseScreenProps =
  HomeNavigatorProps<AppRoute.ADD_EXERCISE_SCREEN>;
export type AddNewExerciseScreenProps =
  HomeNavigatorProps<AppRoute.ADD_NEW_EXERCISE_SCREEN>;

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.HOME_SCREEN}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={AppRoute.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={AppRoute.ADD_CONSUMABLE_SCREEN}
        component={AddConsumableScreen}
      />
      <Stack.Screen
        name={AppRoute.ADD_WATER_SCREEN}
        component={AddWaterScreen}
      />
      <Stack.Screen
        name={AppRoute.ADD_EXERCISE_SCREEN}
        component={AddExerciseScreen}
      />
      <Stack.Screen
        name={AppRoute.ADD_NEW_EXERCISE_SCREEN}
        component={AddNewExcerciseScreen}
        options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={AppRoute.ADD_NEW_CONSUMABLE_SCREEN}
        component={AddNewConsumableScreen}
        options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
