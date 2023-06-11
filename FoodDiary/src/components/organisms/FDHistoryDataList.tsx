import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Consumable} from '../../models/Consumable';
import {Exercise} from '../../models/Exercise';
import FDHistoryDataItem from '../molecules/FDHistoryDataItem';
import {ConsumableType} from '../../constants/ConsumableType';
import {DailyConsumable, DailyExercise} from '../../models/DailyInput';
import {Colors} from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

export type ListType = 'consumable' | 'exercise';

interface FDHistoryDataListProps {
  type: ListType;
  data?: Array<DailyConsumable>;
  title: string;
  style?: ViewStyle;
  exercises?: Array<DailyExercise>;
}

const FDHistoryDataList: React.FC<FDHistoryDataListProps> = ({
  type,
  data,
  title,
  style = {},
  exercises,
}) => {
  if ((!data || data.length === 0) && (!exercises || exercises.length === 0)) {
    return null;
  }

  const handleRenderConsumable = ({
    item,
    index,
  }: ListRenderItemInfo<DailyConsumable>) => {
    return (
      <FDHistoryDataItem
        key={index}
        type={item.consumable.type}
        title={item.consumable.name}
        quantity={`${item.quantity}${
          item.consumable.type === ConsumableType.DRINK ? 'ml' : 'g'
        }`}
        kcal={`${item.consumable.calories} kcal`}
      />
    );
  };

  const handleRenderExercises = ({
    item,
    index,
  }: ListRenderItemInfo<DailyExercise>) => {
    console.log('udje');

    return (
      <FDHistoryDataItem
        key={index}
        type={ConsumableType.EXERCISE}
        title={item.excercise.name}
        quantity={`${item.time} min`}
        kcal={`${item.excercise.calories * item.time} kcal`}
      />
    );
  };

  if (type === 'consumable') {
    return (
      <View style={style}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={data}
          renderItem={handleRenderConsumable}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <LinearGradient
          colors={[Colors.WHITE, 'rgba(255,255,255,0)']}
          style={styles.gradient}
          useAngle
          angle={-90}
        />
      </View>
    );
  } else {
    return (
      <View style={style}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={exercises}
          renderItem={handleRenderExercises}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <LinearGradient
          colors={[Colors.WHITE, 'rgba(255,255,255,0)']}
          style={styles.gradient}
          useAngle
          angle={-90}
        />
      </View>
    );
  }
};

export default FDHistoryDataList;

const styles = StyleSheet.create({
  title: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  gradient: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 50,
  },
});
