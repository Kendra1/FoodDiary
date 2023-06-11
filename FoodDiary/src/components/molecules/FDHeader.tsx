import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';

interface FDHeaderProps {
  text: string;
  onPress: () => void;
}

const FDHeader: React.FC<FDHeaderProps> = ({text, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {Icons.CHEVRON_LEFT_WHITE}
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default FDHeader;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingLeft: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: Colors.WHITE,
    fontWeight: '500',
  },
});
