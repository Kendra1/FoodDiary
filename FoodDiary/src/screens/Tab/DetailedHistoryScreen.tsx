import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import FDDetailedHistoryInformation from '../../components/organisms/FDDetailedHistoryInformation';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';
import {DailyConsumable, DailyInput} from '../../models/DailyInput';
import {DetailedHistoryScreenProps} from '../../navigation/HistoryNavigator';
import {RootState} from '../../store/reducers/RootReducer';
import {ConsumableType} from '../../constants/ConsumableType';
import FDHistoryDataList from '../../components/organisms/FDHistoryDataList';

const DetailedHistoryScreen: React.FC<DetailedHistoryScreenProps> = ({
  navigation,
  route,
}) => {
  const dailyInput: DailyInput = route.params.dailyInput;
  const rating: string = route.params.rating;
  const {loggedInUser} = useSelector((state: RootState) => state.auth);
  const food: Array<DailyConsumable> | undefined =
    dailyInput?.consumables.filter(
      (c: DailyConsumable) => c.consumable.type === ConsumableType.FOOD,
    );
  const drink: Array<DailyConsumable> | undefined =
    dailyInput?.consumables.filter(
      (c: DailyConsumable) => c.consumable.type === ConsumableType.DRINK,
    );

  const color: string = useMemo(() => {
    if (rating === 'Excellent') {
      return Colors.EXCELENT_GREEN;
    } else if (rating === 'Good') {
      return Colors.GOOD_YELLOW;
    } else {
      return Colors.PRIMARY;
    }
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const proteins = dailyInput.consumables.reduce(
    (sum: number, c: DailyConsumable) => {
      return sum + c.consumable.proteins;
    },
    0,
  );

  const carbs = dailyInput.consumables.reduce(
    (sum: number, c: DailyConsumable) => {
      return sum + c.consumable.carbs;
    },
    0,
  );

  const fats = dailyInput.consumables.reduce(
    (sum: number, c: DailyConsumable) => {
      return sum + c.consumable.fats;
    },
    0,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      stickyHeaderIndices={[0]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.xIcon}>
          {Icons.X}
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Hello, {loggedInUser?.firstName}! Let's see your intake history for
          the <Text style={styles.date}>{dailyInput.date.toString()}</Text>
        </Text>
      </View>
      <View style={styles.performance}>
        <Text style={styles.performanceText}>
          Overall you were{' '}
          <Text style={[styles.rating, {color: color}]}>{rating}</Text>
        </Text>
      </View>
      <View>
        <FDDetailedHistoryInformation
          kcal={dailyInput.calories}
          proteins={proteins}
          carbs={carbs}
          fats={fats}
          water={dailyInput.water}
        />
      </View>
      <View style={styles.historyData}>
        <FDHistoryDataList
          type={'consumable'}
          data={food}
          title={'Food for the day'}
          style={styles.margin}
        />
        <FDHistoryDataList
          type={'consumable'}
          data={drink}
          title={'Drinks for the day'}
          style={styles.margin}
        />
        <FDHistoryDataList
          type={'exercise'}
          exercises={dailyInput.exercises}
          title={'Workout for the day'}
        />
      </View>
    </ScrollView>
  );
};

export default DetailedHistoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
  },
  headerContainer: {
    paddingTop: 15,
    height: 35,
    backgroundColor: Colors.WHITE,
  },
  historyData: {
    marginTop: 30,
  },
  header: {
    marginBottom: 15,
  },
  content: {
    paddingBottom: 100,
  },
  margin: {
    marginBottom: 20,
  },
  xIcon: {
    alignSelf: 'flex-end',
    marginRight: -10,
    marginBottom: 15,
    height: 20,
  },
  headerText: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 20,
  },
  date: {
    color: Colors.PRIMARY,
  },
  performance: {
    marginBottom: 32,
  },
  performanceText: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 20,
  },
  rating: {
    textTransform: 'lowercase',
  },
});
