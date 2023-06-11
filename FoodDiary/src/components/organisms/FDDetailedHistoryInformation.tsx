import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import FDHistoryDataRow from '../atoms/FDHistoryDataRow';

interface FDDetailedHistoryInformationProps {
  kcal: number;
  proteins: number;
  carbs: number;
  fats: number;
  water: number;
}

const FDDetailedHistoryInformation: React.FC<
  FDDetailedHistoryInformationProps
> = ({kcal, proteins, carbs, fats, water}) => {
  return (
    <View>
      <Text style={styles.title}>TOTAL</Text>
      <FDHistoryDataRow title="Calories" quantity={kcal} />
      <FDHistoryDataRow title="Proteins" quantity={proteins} />
      <FDHistoryDataRow title="Carbs" quantity={carbs} />
      <FDHistoryDataRow title="Fats" quantity={fats} />
      <FDHistoryDataRow title="Water" quantity={water} />
    </View>
  );
};

export default FDDetailedHistoryInformation;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: Colors.BLACK_60,
    marginBottom: 15,
  },
});
