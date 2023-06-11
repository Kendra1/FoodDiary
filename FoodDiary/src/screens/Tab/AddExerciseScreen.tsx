import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {AddExerciseScreenProps} from '../../navigation/HomeNavigator';
import FDHeader from '../../components/molecules/FDHeader';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import {Colors} from '../../constants/Colors';
import FDConsumableInput from '../../components/molecules/FDConsumableInput';
import FDInlinePicker from '../../components/molecules/FDInlinePicker';
import {useIsFocused} from '@react-navigation/native';
import {Icons} from '../../constants/Icons';
import {AppRoute} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {getExercises} from '../../store/actions/ExerciseActions';
import {RootState} from '../../store/reducers/RootReducer';
import {PickerItem} from '../../components/molecules/FDPicker';
import {Exercise} from '../../models/Exercise';
import {DailyExercise} from '../../models/DailyInput';
import {addExercise} from '../../store/actions/DailyInputActions';

const AddExerciseScreen: React.FC<AddExerciseScreenProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const [value, setValue] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [items, setItems] = useState<Array<PickerItem>>([]);
  const isFocused = useIsFocused();
  const {exercises} = useSelector((state: RootState) => state.exercises);
  const {currentInput} = useSelector((state: RootState) => state.dailyInput);

  useEffect(() => {
    dispatch(getExercises());
  }, [isFocused]);

  useEffect(() => {
    const newItems: Array<PickerItem> = exercises.map((e: Exercise) => {
      return {label: e.name, value: e.id};
    });

    setItems(newItems);
    setValue(newItems[0].value.toString());
  }, [exercises]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    const foundExercise: Exercise | undefined = exercises.find(
      (e: Exercise) => e.id === value,
    );

    if (foundExercise) {
      const newDailyExercise: DailyExercise = {
        id: '',
        excercise: foundExercise,
        time: Number(time),
      };

      dispatch(addExercise(currentInput?.id, newDailyExercise));
      handleGoBack();
    }
  };

  const handleAddNewExcercise = () => {
    navigation.navigate(AppRoute.ADD_NEW_EXERCISE_SCREEN);
  };

  return (
    <View style={styles.topContainer}>
      <FDHeader text={'Add workout'} onPress={handleGoBack} />
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>
            Select the type of workout or add a new one
          </Text>
          <TouchableOpacity
            onPress={handleAddNewExcercise}
            style={styles.addContainer}>
            {Icons.PLUS_RED}
          </TouchableOpacity>
          <FDInlinePicker
            items={items}
            value={value}
            onValueChange={setValue}
          />
          <Text style={styles.question}>How long did you exercise for?</Text>
          <FDConsumableInput
            value={time}
            label="Enter time"
            placeholder="eg. 30"
            type="number"
            unit="min"
            onChangeValue={setTime}
          />
        </View>
        <FDPrimaryButton
          style={styles.submit}
          text={'Submit'}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  topContainer: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 150,
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
  },
  addContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.WHITE,
    padding: 8,
    shadowColor: Colors.BLACK_10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
  },
  question: {
    fontSize: 20,
    marginBottom: 18,
    fontWeight: '500',
  },
  submit: {
    width: '85%',
    alignSelf: 'center',
  },
});
