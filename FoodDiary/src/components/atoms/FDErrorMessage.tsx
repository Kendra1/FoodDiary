import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDErrorMessageProps {
  text: string;
  show: boolean;
}

const FDErrorMessage: React.FC<FDErrorMessageProps> = ({text, show}) => {
  if (!show) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>*{text}</Text>
    </View>
  );
};

export default FDErrorMessage;

const styles = StyleSheet.create({
  container: {
    height: 20,
    marginTop: 5,
  },
  text: {
    color: Colors.PRIMARY,
  },
});
