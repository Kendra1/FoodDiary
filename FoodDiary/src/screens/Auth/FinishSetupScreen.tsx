import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import FDStableBlurView from '../../components/atoms/FDStableBlurView';
import FDRowInput from '../../components/molecules/FDRowInput';
import {Colors} from '../../constants/Colors';
import {Images} from '../../constants/Images';
import {UserSetting} from '../../models/UserSettings';
import {FinishSetupScreenProps} from '../../navigation/AuthNavigator';
import {AppRoute} from '../../navigation/routes';
import {createUserSettings} from '../../store/actions/UserActions';
import {setInitiateSetup} from '../../store/reducers/AuthReducer';
import {RootState} from '../../store/reducers/RootReducer';

const FinishSetupScreen: React.FC<FinishSetupScreenProps> = ({navigation}) => {
  const [calories, setCalories] = useState<number>(0);
  const [proteins, setProteins] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [carbs, setCarbs] = useState<number>(0);
  const [water, setWater] = useState<number>(0);

  const dispatch = useDispatch<any>();
  const insets = useSafeAreaInsets();
  const {registeringUser} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setInitiateSetup(false));
  }, []);

  useEffect(() => {
    if (!registeringUser) {
      navigation.navigate(AppRoute.LOGIN_SCREEN);
    }
  }, [registeringUser]);

  const handleDone = () => {
    const settings: UserSetting = {
      id: undefined,
      caloriesLimit: calories,
      proteinsLimit: proteins,
      carbsLimit: carbs,
      fatsLimit: fat,
      waterIntake: water,
    };

    if (registeringUser) {
      dispatch(createUserSettings(registeringUser?.id, settings));
    }
  };

  return (
    <ImageBackground
      source={Images.BACKGROUND}
      style={[
        styles.container,
        {paddingVertical: insets.top === 0 ? 30 : insets.top},
      ]}>
      <View style={styles.content}>
        <FDStableBlurView
          blurAmount={20}
          blurType={'light'}
          style={styles.blurContainer}
        />
        <View style={styles.innerContent}>
          <Text style={styles.title}>Few more things left to do</Text>
          <Text style={styles.description}>
            In order for us to accurately track your progress we need to set
            some starting limits - don’t worry you can always change this in
            settings
          </Text>
          <Text style={styles.subtitle}>Per day:</Text>
          <View>
            <FDRowInput
              title={'Calories limit'}
              value={calories}
              onChangeText={setCalories}
            />
            <FDRowInput
              title={'Proteins limit'}
              value={proteins}
              onChangeText={setProteins}
            />
            <FDRowInput title={'Fat limit'} value={fat} onChangeText={setFat} />
            <FDRowInput
              title={'Carb limit'}
              value={carbs}
              onChangeText={setCarbs}
            />
            <FDRowInput
              title={'Water intake'}
              value={water}
              onChangeText={setWater}
            />
          </View>
          <FDPrimaryButton
            style={styles.button}
            text={'All done'}
            onPress={handleDone}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default FinishSetupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  blurContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.WHITE_70,
    borderRadius: 20,
  },
  content: {
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.BLACK,
  },
  innerContent: {
    padding: 30,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 25,
    color: Colors.BLACK,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 25,
    color: Colors.BLACK_60,
  },
  button: {
    marginTop: 40,
  },
});
