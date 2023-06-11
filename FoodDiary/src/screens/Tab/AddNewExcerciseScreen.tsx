import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {AddNewExerciseScreenProps} from '../../navigation/HomeNavigator';
import {Colors} from '../../constants/Colors';
import {useDispatch} from 'react-redux';
import {Icons} from '../../constants/Icons';
import FDConsumableInput from '../../components/molecules/FDConsumableInput';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import {createExercise} from '../../store/actions/ExerciseActions';
import {Exercise} from '../../models/Exercise';

const AddNewExcerciseScreen: React.FC<AddNewExerciseScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch<any>();
  const [exerciseName, setExerciseName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    const newExercise: Exercise = {
      id: '',
      name: exerciseName,
      calories: Number(calories),
    };
    dispatch(createExercise(newExercise));
    handleGoBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleGoBack} style={styles.xIcon}>
          {Icons.X}
        </TouchableOpacity>
        <View style={styles.icon}>{Icons.EXERCISE_BIG}</View>
        <FDConsumableInput
          value={exerciseName}
          label={'Enter the new exercise'}
          placeholder={'eg. Football'}
          type="text"
          onChangeValue={setExerciseName}
        />
        <FDConsumableInput
          value={calories}
          label="Enter caloric value"
          placeholder="eg. 450"
          type="number"
          onChangeValue={setCalories}
          unit="kcal"
          per="/min"
        />
      </View>
      <FDPrimaryButton text={'Submit'} onPress={handleSubmit} />
    </View>
  );
};

export default AddNewExcerciseScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 15,
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  xIcon: {
    alignSelf: 'flex-end',
    marginRight: -10,
  },
  icon: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
