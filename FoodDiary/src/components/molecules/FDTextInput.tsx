import {StyleSheet, Text, TextInput, View, ViewStyle} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDTextInputProps {
  label: string;
  value: string;
  style?: ViewStyle;
  password?: boolean;
  placeholder: string;
  onChangeText: (val: string) => void;
}

const FDTextInput: React.FC<FDTextInputProps> = ({
  label,
  value,
  style = {},
  password = false,
  placeholder,
  onChangeText,
}) => {
  return (
    <View style={style}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        value={value}
        secureTextEntry={password}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholderTextColor={Colors.BLACK_30}
      />
    </View>
  );
};

export default FDTextInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.WHITE,
    padding: 18,
    borderRadius: 4,
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
});
