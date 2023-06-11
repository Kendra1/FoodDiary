import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../../constants/Colors';
import {ConsumableType} from '../../constants/ConsumableType';
import {Icons} from '../../constants/Icons';

interface FDHistoryOptionsProps {
  activeTab: ConsumableType;
  setActiveTab: React.Dispatch<React.SetStateAction<ConsumableType>>;
}

const FDHistoryOptions: React.FC<FDHistoryOptionsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setActiveTab(ConsumableType.FOOD)}
        style={[
          styles.icon,
          activeTab === ConsumableType.FOOD && styles.selected,
        ]}>
        {activeTab === ConsumableType.FOOD ? Icons.FOOD_WHITE : Icons.FOOD_RED}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(ConsumableType.WATER)}
        style={[
          styles.icon,
          activeTab === ConsumableType.WATER && styles.selected,
        ]}>
        {activeTab === ConsumableType.WATER
          ? Icons.WATER_WHITE
          : Icons.WATER_RED}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(ConsumableType.DRINK)}
        style={[
          styles.icon,
          activeTab === ConsumableType.DRINK && styles.selected,
        ]}>
        {activeTab === ConsumableType.DRINK
          ? Icons.DRINK_WHITE
          : Icons.DRINK_RED}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveTab(ConsumableType.EXERCISE)}
        style={[
          styles.icon,
          activeTab === ConsumableType.EXERCISE && styles.selected,
        ]}>
        {activeTab === ConsumableType.EXERCISE
          ? Icons.EXERCISE_WHITE
          : Icons.EXERCISE_RED}
      </TouchableOpacity>
    </View>
  );
};

export default FDHistoryOptions;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 44,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
  },
});
