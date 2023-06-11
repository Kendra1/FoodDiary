import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';
import {Images} from '../../constants/Images';
import {DailyExercise, DailyInput} from '../../models/DailyInput';

interface FDHistoryItemProps {
  dailyInput: DailyInput;
  limit: number | undefined;
  handleNavigationToDetailedHistory: (
    dailyInput: DailyInput,
    rating: string,
  ) => void;
}

const FDHistoryItem: React.FC<FDHistoryItemProps> = ({
  dailyInput,
  limit = 0,
  handleNavigationToDetailedHistory,
}) => {
  const [rating, setRating] = useState<string>('');

  useEffect(() => {
    if (dailyInput.calories <= limit) {
      setRating('Excellent');
    } else if (
      dailyInput.calories >= limit + limit * 0.2 &&
      dailyInput.calories <= limit + limit * 0.5
    ) {
      setRating('Good');
    } else {
      setRating('Bad');
    }
  }, []);

  const color: string = useMemo(() => {
    if (rating === 'Excellent') {
      return Colors.EXCELENT_GREEN;
    } else if (rating === 'Good') {
      return Colors.GOOD_YELLOW;
    } else {
      return Colors.PRIMARY;
    }
  }, [rating]);

  const calculateTime = () =>
    dailyInput.exercises.reduce((sum: number, e: DailyExercise) => {
      return sum + e.time;
    }, 0);

  const handleNavigatoToInput = () => {
    console.log('rating', rating);
    handleNavigationToDetailedHistory(dailyInput, rating);
  };

  return (
    <TouchableOpacity onPress={handleNavigatoToInput}>
      <ImageBackground
        source={Images.HISTORY_ITEM_BACKGROUND}
        resizeMode="cover"
        blurRadius={1}
        style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.info}>
            <Text style={styles.infoDate}>{dailyInput.date.toString()}</Text>
            <View style={[styles.rating, {backgroundColor: color}]}>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>
          <View style={styles.intakeContainer}>
            <View style={styles.intakeInfo}>
              <View>{Icons.FOOD_RED}</View>
              <Text>{dailyInput.calories} kcal</Text>
            </View>
            <View>
              <View>{Icons.WATER_RED}</View>
              <Text>{dailyInput.water} ml</Text>
            </View>
            <View>
              <View>{Icons.EXERCISE_RED}</View>
              <Text>{calculateTime()} min</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FDHistoryItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 125,
    borderRadius: 10,
    marginBottom: 25,
  },
  innerContainer: {
    backgroundColor: Colors.WHITE_90,
    borderRadius: 10,
    flexGrow: 1,
    marginVertical: 15,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  info: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoDate: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.BLACK,
  },
  rating: {
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
  },
  ratingText: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '400',
    color: Colors.BLACK,
  },
  intakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  intakeInfo: {
    alignItems: 'center',
  },
});
