import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';

interface FDHistoryDataRowProps {
  title: string;
  quantity: number;
}

const FDHistoryDataRow: React.FC<FDHistoryDataRowProps> = ({
  title,
  quantity,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.text}>{quantity}</Text>
    </View>
  );
};

export default FDHistoryDataRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK_10,
    paddingVertical: 15,
  },
  text: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
});
