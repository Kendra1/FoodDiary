import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ConsumableType} from '../../constants/ConsumableType';
import {DailyExercise} from '../../models/DailyInput';
import FDFoodHistorySimpleItem from '../molecules/FDFoodHistorySimpleItem';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';

interface FDExerciseListProps {
  data: Array<DailyExercise> | undefined;
  onAddExercise: () => void;
}

const FDExerciseList: React.FC<FDExerciseListProps> = ({
  data,
  onAddExercise,
}) => {
  const handleRenderItem = ({
    item,
    index,
  }: ListRenderItemInfo<DailyExercise>) => {
    return (
      <FDFoodHistorySimpleItem
        key={index}
        type={ConsumableType.EXERCISE}
        name={item.excercise.name}
        portion={item.time}
        kcal={item.excercise.calories * item.time}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Exercise for the day</Text>
        <TouchableOpacity onPress={onAddExercise} style={styles.addButton}>
          {Icons.PLUS_WHITE}
        </TouchableOpacity>
      </View>
      {data ? (
        <FlatList
          data={data}
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

export default FDExerciseList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  data: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
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
