import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ConsumableType} from '../../constants/ConsumableType';
import {Icons} from '../../constants/Icons';
import {Colors} from '../../constants/Colors';

interface FDHistoryDataItemProps {
  type: ConsumableType;
  title: string;
  quantity: string;
  kcal: string;
}

const FDHistoryDataItem: React.FC<FDHistoryDataItemProps> = ({
  type,
  title,
  quantity,
  kcal,
}) => {
  const icon =
    type === ConsumableType.FOOD
      ? Icons.FOOD_WHITE
      : type === ConsumableType.DRINK
      ? Icons.DRINK_WHITE
      : Icons.EXERCISE_WHITE;

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.icon}>{icon}</View>
        <View style={styles.dataContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.topContent}>
            <Text style={styles.quantity}>{quantity}</Text>
            <Text style={styles.kcal}> | {kcal}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FDHistoryDataItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContent: {
    flexDirection: 'row',
  },
  dataContainer: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  title: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
  },
  quantity: {
    color: Colors.BLACK_30,
    fontSize: 16,
  },
  kcal: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});
