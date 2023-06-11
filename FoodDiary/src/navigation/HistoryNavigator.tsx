import {RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {AppRoute} from './routes';
import {DailyInput} from '../models/DailyInput';
import HistoryScreen from '../screens/Tab/HistoryScreen';
import DetailedHistoryScreen from '../screens/Tab/DetailedHistoryScreen';
const Stack = createNativeStackNavigator<HistoryNavigatorParams>();

export type HistoryNavigatorParams = {
  [AppRoute.HISTORY_SCREEN]: any;
  [AppRoute.DETAILED_HISTORY_SCREEN]: {
    dailyInput: DailyInput;
    rating: string;
  };
};

export interface HistoryNavigatorProps<
  Screen extends keyof HistoryNavigatorParams,
> {
  navigation: NativeStackNavigationProp<HistoryNavigatorParams, Screen>;
  route: RouteProp<HistoryNavigatorParams, Screen>;
}

export type HistoryScreenProps = HistoryNavigatorProps<AppRoute.HISTORY_SCREEN>;
export type DetailedHistoryScreenProps =
  HistoryNavigatorProps<AppRoute.DETAILED_HISTORY_SCREEN>;

export const HistoryNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AppRoute.HISTORY_SCREEN}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={AppRoute.HISTORY_SCREEN} component={HistoryScreen} />
      <Stack.Screen
        name={AppRoute.DETAILED_HISTORY_SCREEN}
        component={DetailedHistoryScreen}
        options={{
          presentation: 'formSheet',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
