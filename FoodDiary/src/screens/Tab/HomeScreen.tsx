import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FDHistoryOptions from '../../components/molecules/FDHistoryOptions';
import FDImageHeader from '../../components/molecules/FDImageHeader';
import FDConsumableList from '../../components/organisms/FDConsumableList';
import FDExerciseList from '../../components/organisms/FDExerciseList';
import {Colors} from '../../constants/Colors';
import {ConsumableType} from '../../constants/ConsumableType';
import {DailyConsumable} from '../../models/DailyInput';
import {getTodaysInput} from '../../store/actions/DailyInputActions';
import {RootState} from '../../store/reducers/RootReducer';
import {HomeScreenProps} from '../../navigation/HomeNavigator';
import {AppRoute} from '../../navigation/routes';
import FDWaterIntake from '../../components/molecules/FDWaterIntake';
import {setLoggedIn} from '../../store/reducers/AuthReducer';
import {useIsFocused} from '@react-navigation/native';
import FDSemiCircleProgress from '../../components/organisms/FDSemiCircleProgress';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const {loggedInUser, settings} = useSelector(
    (state: RootState) => state.auth,
  );
  const {currentInput} = useSelector((state: RootState) => state.dailyInput);
  const [activeTab, setActiveTab] = useState<ConsumableType>(
    ConsumableType.FOOD,
  );
  const isFocused: boolean = useIsFocused();
  const food: Array<DailyConsumable> | undefined =
    currentInput?.consumables.filter(
      (c: DailyConsumable) => c.consumable.type === ConsumableType.FOOD,
    );
  const drink: Array<DailyConsumable> | undefined =
    currentInput?.consumables.filter(
      (c: DailyConsumable) => c.consumable.type === ConsumableType.DRINK,
    );

  useEffect(() => {
    if (loggedInUser && isFocused) {
      dispatch(getTodaysInput(loggedInUser));
    }
  }, [isFocused, loggedInUser]);

  const handleAddConsumable = (type: ConsumableType) => {
    navigation.navigate(AppRoute.ADD_CONSUMABLE_SCREEN, {type: type});
  };

  const handleAddWaterIntake = () => {
    navigation.navigate(AppRoute.ADD_WATER_SCREEN, {
      remainder: settings?.waterIntake,
    });
  };

  const handleAddExercise = () => {
    navigation.navigate(AppRoute.ADD_EXERCISE_SCREEN);
  };

  const handleRenderHistory = () => {
    switch (activeTab) {
      case ConsumableType.FOOD: {
        return (
          <FDConsumableList
            type={ConsumableType.FOOD}
            data={food}
            onAddConsumable={handleAddConsumable}
          />
        );
      }
      case ConsumableType.DRINK: {
        return (
          <FDConsumableList
            type={ConsumableType.DRINK}
            data={drink}
            onAddConsumable={handleAddConsumable}
          />
        );
      }
      case ConsumableType.WATER: {
        return (
          <FDWaterIntake
            data={currentInput?.water}
            onAddWaterIntake={handleAddWaterIntake}
          />
        );
      }
      case ConsumableType.EXERCISE: {
        return (
          <FDExerciseList
            data={currentInput?.exercises}
            onAddExercise={handleAddExercise}
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <FDImageHeader title={`Welcome back, ${loggedInUser?.firstName}`} />
      <View style={styles.meterContainer}>
        <FDSemiCircleProgress
          initialPercentage={
            (currentInput?.calories! > settings?.caloriesLimit!
              ? settings?.caloriesLimit
              : currentInput?.calories) || 0
          }
          percentage={
            (currentInput?.calories! > settings?.caloriesLimit!
              ? settings?.caloriesLimit
              : currentInput?.calories) || 0
          }
          progressColor={Colors.BLACK}
          minValue={0}
          maxValue={settings?.caloriesLimit || 100}
          progressWidth={5}
          currentValue={0}>
          <View style={styles.internalCircleData}>
            <Text style={styles.circleText}>{currentInput?.calories} kcal</Text>
          </View>
        </FDSemiCircleProgress>
      </View>
      <View style={styles.content}>
        <FDHistoryOptions activeTab={activeTab} setActiveTab={setActiveTab} />
        {handleRenderHistory()}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    padding: 20,
  },
  meterContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  internalCircleData: {
    alignItems: 'center',
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  circleText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.BLACK_30,
  },
});
