import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

type inputType = 'number' | 'text';

interface FDConsumableInputProps {
  value: string;
  label?: string;
  placeholder: string;
  type: inputType;
  unit?: string;
  per?: string;
  onChangeValue: (val: string) => void;
}

const FDConsumableInput: React.FC<FDConsumableInputProps> = ({
  value,
  label = '',
  placeholder,
  type,
  unit = '',
  per = '',
  onChangeValue,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeValue}
          style={styles.input}
          keyboardType={type === 'number' ? 'number-pad' : 'default'}
          autoCapitalize={'none'}
          autoCorrect={false}
          placeholderTextColor={Colors.BLACK_30}
        />
        {unit && <Text style={styles.unit}>{unit}</Text>}
        {per && <Text style={styles.per}>{per}</Text>}
      </View>
    </View>
  );
};

export default FDConsumableInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 23,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    shadowColor: Colors.BLACK_10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 5,
    fontSize: 16,
    color: Colors.BLACK,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: Colors.BLACK,
  },
  unit: {
    position: 'absolute',
    right: 10,
    fontSize: 16,
    fontWeight: '300',
  },
  per: {
    position: 'absolute',
    right: 0,
    bottom: -23,
    fontSize: 16,
    color: Colors.BLACK_30,
  },
});
