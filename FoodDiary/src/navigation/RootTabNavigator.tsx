import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {AppRoute} from './routes';
import HomeScreen from '../screens/Tab/HomeScreen';
import {Colors} from '../constants/Colors';
import {StyleSheet, Platform} from 'react-native';
import FDTabIcon from '../components/atoms/FDTabIcon';
import HistoryScreen from '../screens/Tab/HistoryScreen';
import SettingsScreen from '../screens/Tab/SettingsScreen';
import {HomeNavigator} from './HomeNavigator';
import {HistoryNavigator} from './HistoryNavigator';

const Tab = createBottomTabNavigator<RootTabNavigatorParams>();

export type RootTabNavigatorParams = {
  [AppRoute.HOME_NAVIGATOR]: any;
  [AppRoute.HISTORY_NAVIGATOR]: any;
  [AppRoute.SETTINGS_SCREEN]: any;
};

export interface RootTabProps<Screen extends keyof RootTabNavigatorParams> {
  navigation: NativeStackNavigationProp<RootTabNavigatorParams, Screen>;
  route: RouteProp<RootTabNavigatorParams, Screen>;
}

export type SettingsScreenProps = RootTabProps<AppRoute.SETTINGS_SCREEN>;

export const RootTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={AppRoute.HOME_NAVIGATOR}
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        title: '',
      })}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <FDTabIcon
              text={'Home'}
              isFocused={focused}
              title={AppRoute.HOME_SCREEN}
            />
          ),
        }}
        name={AppRoute.HOME_NAVIGATOR}
        component={HomeNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <FDTabIcon
              text={'History'}
              isFocused={focused}
              title={AppRoute.HISTORY_SCREEN}
            />
          ),
        }}
        name={AppRoute.HISTORY_NAVIGATOR}
        component={HistoryNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <FDTabIcon
              text={'Settings'}
              isFocused={focused}
              title={AppRoute.SETTINGS_SCREEN}
            />
          ),
        }}
        name={AppRoute.SETTINGS_SCREEN}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    height: Platform.OS === 'android' ? 70 : 95,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 50,
    paddingBottom: Platform.OS === 'android' ? 0 : 25,
  },
});
