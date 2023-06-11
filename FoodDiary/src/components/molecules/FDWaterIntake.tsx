import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';
import FDFoodHistorySimpleItem from './FDFoodHistorySimpleItem';
import {ConsumableType} from '../../constants/ConsumableType';

interface FDWaterIntakeProps {
  data: number | undefined;
  onAddWaterIntake: () => void;
}

const FDWaterIntake: React.FC<FDWaterIntakeProps> = ({
  data,
  onAddWaterIntake,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Water intake for the day</Text>
        <TouchableOpacity onPress={onAddWaterIntake} style={styles.addButton}>
          {Icons.PLUS_WHITE}
        </TouchableOpacity>
      </View>
      <View style={styles.data}>
        {data ? (
          <FDFoodHistorySimpleItem
            key={0}
            type={ConsumableType.WATER}
            name={'Water'}
            portion={data}
            kcal={0}
          />
        ) : (
          <Text style={styles.noData}>No data</Text>
        )}
      </View>
    </View>
  );
};

export default FDWaterIntake;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  data: {
    marginTop: 20,
  },
  noData: {
    color: Colors.BLACK_60,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500',
    marginTop: 20,
  },
});
