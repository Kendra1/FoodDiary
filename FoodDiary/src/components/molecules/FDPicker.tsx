import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';

export interface PickerItem {
  label: string;
  value: string | number;
}

interface FDPickerProps {
  items: Array<PickerItem>;
  style?: ViewStyle;
  onAddNew: () => void;
  onValueChange: (val: string) => void;
}

const FDPicker: React.FC<FDPickerProps> = ({
  items,
  style,
  onAddNew,
  onValueChange,
}) => {
  const icon: any = () => (
    <View style={styles.icon}>{Icons.CHEVRON_DOWN_RED}</View>
  );

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      ...styles.picker,
    },
    inputAndroid: {
      ...styles.picker,
    },
  });

  return (
    <View style={[styles.container, style]}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={onValueChange}
          items={items}
          style={pickerSelectStyles}
          Icon={icon}
        />
      </View>
      <TouchableOpacity onPress={onAddNew} style={styles.plusContainer}>
        {Icons.PLUS_RED}
      </TouchableOpacity>
    </View>
  );
};

export default FDPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    height: '100%',
    justifyContent: 'center',
    right: 10,
    top: 10,
  },
  pickerContainer: {
    width: '80%',
  },
  picker: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 4,
    color: Colors.BLACK,
    paddingRight: 30,
    backgroundColor: Colors.WHITE,
  },
  plusContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.PRIMARY,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
