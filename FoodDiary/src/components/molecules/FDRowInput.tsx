import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDRowInputProps {
  title: string;
  value: number;
  onChangeText: (val: number) => void;
}

const FDRowInput: React.FC<FDRowInputProps> = ({
  title,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        value={value.toString()}
        autoCorrect={false}
        keyboardType={'number-pad'}
        onChangeText={(txt: string) => onChangeText(Number(txt))}
        style={styles.input}
      />
    </View>
  );
};

export default FDRowInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  input: {
    borderBottomColor: Colors.BLACK,
    borderBottomWidth: 1,
    width: 60,
    fontSize: 18,
    fontWeight: '500',
    color: Colors.BLACK,
  },
});
