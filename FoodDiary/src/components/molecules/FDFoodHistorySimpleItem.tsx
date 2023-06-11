import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icons} from '../../constants/Icons';
import {ConsumableType} from '../../constants/ConsumableType';
import {Colors} from '../../constants/Colors';

interface FDFoodHistorySimpleItemProps {
  type: ConsumableType;
  name: string;
  portion: number;
  kcal: string;
}

const FDFoodHistorySimpleItem: React.FC<FDFoodHistorySimpleItemProps> = ({
  type,
  name,
  portion,
  kcal,
}) => {
  const renderIcon = () => {
    switch (type) {
      case ConsumableType.FOOD:
        return Icons.FOOD_WHITE;
      case ConsumableType.DRINK:
        return Icons.DRINK_WHITE;
      case ConsumableType.WATER:
        return Icons.WATER_WHITE;
      case ConsumableType.EXERCISE:
        return Icons.EXERCISE_WHITE;
    }
  };

  const renderUnit = () => {
    switch (type) {
      case ConsumableType.FOOD:
        return 'g';
      case ConsumableType.DRINK:
      case ConsumableType.WATER:
        return 'ml';
      case ConsumableType.EXERCISE:
        return 'min';
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.content}>
        <View style={styles.icon}>{renderIcon()}</View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.portion}>
            {portion}
            {renderUnit()}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.kcal}>{kcal} kcal</Text>
      </View>
    </View>
  );
};

export default FDFoodHistorySimpleItem;

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 61,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PRIMARY,
    padding: 8,
    borderRadius: 5,
  },
  info: {
    paddingLeft: 10,
  },
  name: {
    fontWeight: '400',
  },
  portion: {
    color: Colors.BLACK_30,
  },
  kcal: {
    fontWeight: '500',
  },
});
