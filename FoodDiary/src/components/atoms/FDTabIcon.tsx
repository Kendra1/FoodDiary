import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {AppRoute} from '../../navigation/routes';
import {Icons} from '../../constants/Icons';
import {Colors} from '../../constants/Colors';

interface FDTabIconProps {
  text: string;
  title: AppRoute;
  isFocused: boolean;
}

const FDTabIcon: React.FC<FDTabIconProps> = ({text, title, isFocused}) => {
  const icon = useMemo(() => {
    switch (title) {
      case AppRoute.HOME_SCREEN: {
        return isFocused ? Icons.HOME_ICON_RED : Icons.HOME_ICON_WHITE;
      }
      case AppRoute.HISTORY_SCREEN: {
        return isFocused ? Icons.HISTORY_ICON_RED : Icons.HISTORY_ICON_WHITE;
      }
      case AppRoute.SETTINGS_SCREEN: {
        return isFocused ? Icons.SETTINGS_ICON_RED : Icons.SETTINGS_ICON_WHITE;
      }
    }
  }, [isFocused, title]);

  return (
    <View style={[styles.container, isFocused && styles.activeContainer]}>
      {icon}
      {!isFocused && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default FDTabIcon;

const styles = StyleSheet.create({
  container: {
    marginTop: 12.5,
    alignItems: 'center',
  },
  text: {
    marginBottom: -10,
    marginTop: 5,
    color: Colors.WHITE,
    fontSize: 14,
  },
  activeContainer: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 30,
  },
});
