import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DailyConsumable} from '../../models/DailyInput';
import FDFoodHistorySimpleItem from '../molecules/FDFoodHistorySimpleItem';
import {ConsumableType} from '../../constants/ConsumableType';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';

interface FDConsumableListProps {
  type: ConsumableType;
  data: Array<DailyConsumable> | undefined;
  onAddConsumable: (type: ConsumableType) => void;
}

const FDConsumableList: React.FC<FDConsumableListProps> = ({
  type,
  data,
  onAddConsumable,
}) => {
  const handleRenderItem = ({
    item,
    index,
  }: ListRenderItemInfo<DailyConsumable>) => {
    return (
      <FDFoodHistorySimpleItem
        key={index}
        type={item.consumable.type}
        name={item.consumable.name}
        portion={item.quantity}
        kcal={(item.consumable.calories * (item.quantity / 100)).toFixed(2)}
      />
    );
  };

  const handleAddConsumable = () => {
    onAddConsumable(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {type === ConsumableType.FOOD ? 'Food' : 'Drink'} for the day
        </Text>
        <TouchableOpacity
          onPress={handleAddConsumable}
          style={styles.addButton}>
          {Icons.PLUS_WHITE}
        </TouchableOpacity>
      </View>
      {data ? (
        <FlatList
          data={data}
          contentContainerStyle={styles.content}
          style={styles.data}
          renderItem={handleRenderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noData}>No data</Text>
      )}
    </View>
  );
};

export default FDConsumableList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {},
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  data: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    color: Colors.BLACK_60,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: 20,
  },
});
