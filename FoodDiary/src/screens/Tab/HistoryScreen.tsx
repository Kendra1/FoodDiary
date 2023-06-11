import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import FDHistoryItem from '../../components/molecules/FDHistoryItem';
import {Colors} from '../../constants/Colors';
import FDImageHeader from '../../components/molecules/FDImageHeader';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/reducers/RootReducer';
import {getDailyInputs} from '../../store/actions/DailyInputActions';
import {DailyInput} from '../../models/DailyInput';
import {HistoryScreenProps} from '../../navigation/HistoryNavigator';
import {AppRoute} from '../../navigation/routes';

const HistoryScreen: React.FC<HistoryScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const limit = useSelector(
    (state: RootState) => state.auth.settings?.caloriesLimit,
  );
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(getDailyInputs(user));
    }
  }, [user]);

  const dailyInputs: DailyInput[] = useSelector(
    (state: RootState) => state.dailyInput.dailyInputs,
  );

  const navigateToDetailedHistory = (
    dailyInput: DailyInput,
    rating: string,
  ) => {
    navigation.navigate(AppRoute.DETAILED_HISTORY_SCREEN, {
      dailyInput: dailyInput,
      rating: rating,
    });
  };

  const handleRenderItem = ({item, index}: ListRenderItemInfo<DailyInput>) => {
    return (
      <FDHistoryItem
        key={index}
        dailyInput={item}
        limit={limit}
        handleNavigationToDetailedHistory={navigateToDetailedHistory}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FDImageHeader title={"Let's look at your history"} />
      <View style={styles.content}>
        <FlatList
          data={dailyInputs}
          renderItem={handleRenderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
});
