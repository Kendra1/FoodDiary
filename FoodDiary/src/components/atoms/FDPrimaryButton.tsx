import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDPrimaryButtonProps {
  text: string;
  style?: ViewStyle;
  onPress: () => void;
}

const FDPrimaryButton: React.FC<FDPrimaryButtonProps> = ({
  text,
  style = {},
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FDPrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.WHITE,
  },
});
