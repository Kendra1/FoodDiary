import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PickerItem} from './FDPicker';

interface FDInlinePickerProps {
  value: string;
  items: Array<PickerItem>;
  sufix?: string;
  onValueChange: (val: string) => void;
}

const FDInlinePicker: React.FC<FDInlinePickerProps> = ({
  value,
  items,
  sufix = '',
  onValueChange,
}) => {
  return (
    <View>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, _) => onValueChange(itemValue)}>
        {items.map((item: PickerItem) => (
          <Picker.Item
            key={item.value}
            label={`${item.label} ${sufix}`}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default FDInlinePicker;

const styles = StyleSheet.create({});
