import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FDHeader from '../../components/molecules/FDHeader';
import {ConsumableType} from '../../constants/ConsumableType';
import {AddWaterScreenProps} from '../../navigation/HomeNavigator';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import {Icons} from '../../constants/Icons';
import {Colors} from '../../constants/Colors';
import FDInlinePicker from '../../components/molecules/FDInlinePicker';
import {WaterQuantity} from '../../constants/WaterQuantity';
import {useDispatch, useSelector} from 'react-redux';
import {addWater} from '../../store/actions/DailyInputActions';
import {RootState} from '../../store/reducers/RootReducer';

const AddWaterScreen: React.FC<AddWaterScreenProps> = ({navigation, route}) => {
  const dispatch = useDispatch<any>();
  const remainder: number | undefined = route.params.remainder;
  const {currentInput} = useSelector((state: RootState) => state.dailyInput);
  const [value, setValue] = useState<string>(WaterQuantity[0].value.toString());

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    dispatch(
      addWater(
        currentInput ? currentInput.id : undefined,
        Number(value + currentInput?.water),
      ),
    );
    handleGoBack();
  };

  return (
    <View style={styles.container}>
      <FDHeader
        text={`Add ${ConsumableType.WATER} intake`}
        onPress={handleGoBack}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Select how much water you have drank</Text>
          <FDInlinePicker
            items={WaterQuantity}
            value={value}
            sufix={'ml'}
            onValueChange={setValue}
          />
        </View>
        <View style={styles.goal}>
          <View style={styles.icon}>{Icons.GOAL_RED}</View>
          <View style={styles.textContent}>
            {remainder ? (
              <Text style={styles.goalText}>
                You have <Text style={styles.textWeight}>{remainder}</Text> ml
                left to your target goal!
              </Text>
            ) : (
              <Text style={styles.goalText}>
                Please set your daily water intake goal!
              </Text>
            )}
          </View>
        </View>

        <FDPrimaryButton text={'Submit'} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddWaterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 150,
  },
  text: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
  },
  goal: {
    backgroundColor: Colors.LIGHT_RED,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
  },
  icon: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    width: '80%',
    paddingRight: 55,
    paddingLeft: 25,
  },
  goalText: {
    color: Colors.PRIMARY,
    fontSize: 16,
    textAlign: 'center',
  },
  textWeight: {
    fontWeight: '700',
  },
});
