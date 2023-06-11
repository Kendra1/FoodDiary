import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDSettingDataRowProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const FDSettingDataRow: React.FC<FDSettingDataRowProps> = ({
  label,
  value,
  onValueChange,
}) => {
  const setChanges = (value: number) => {
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.input}>{label}</Text>
      <TextInput
        value={value.toString()}
        autoCorrect={false}
        keyboardType={'number-pad'}
        onChangeText={(txt: string) => setChanges(Number(txt))}
        style={styles.input}
      />
    </View>
  );
};

export default FDSettingDataRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK_10,
    paddingVertical: 18,
  },
  input: {
    color: Colors.BLACK,
    fontWeight: '400',
    fontSize: 20,
  },
});
