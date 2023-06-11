import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SettingsScreenProps} from '../../navigation/RootTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/reducers/RootReducer';
import FDImageHeader from '../../components/molecules/FDImageHeader';
import {Colors} from '../../constants/Colors';
import FDSettingDataRow from '../../components/atoms/FDSettingDataRow';
import {setLoggedIn} from '../../store/reducers/AuthReducer';
import {updateUserSettings} from '../../store/actions/UserActions';

const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  const dispatch = useDispatch<any>();
  const settings = useSelector((state: RootState) => state.auth.settings);
  const [changesDetected, setChangesDetected] = useState<boolean>(false);

  const [data, setData] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
    water: 0,
  });

  useEffect(() => {
    if (settings) {
      setData({
        calories: settings.caloriesLimit,
        proteins: settings.proteinsLimit,
        fats: settings.fatsLimit,
        carbs: settings.carbsLimit,
        water: settings.waterIntake,
      });
    }
  }, [settings]);

  const handleSetData = (value: number, name: string) => {
    const newData = {...data, [name]: value};
    setData(newData);
    if (
      JSON.stringify(newData) !== JSON.stringify(settings) &&
      !changesDetected
    ) {
      setChangesDetected(true);
    }
  };

  const handleSettingsUpdate = () => {
    dispatch(
      updateUserSettings({
        id: settings?.id,
        caloriesLimit: data.calories,
        proteinsLimit: data.proteins,
        fatsLimit: data.fats,
        carbsLimit: data.carbs,
        waterIntake: data.water,
      }),
    );
    setChangesDetected(false);
  };

  const handleLogout = () => dispatch(setLoggedIn(false));

  return (
    <View style={styles.container}>
      <FDImageHeader title={'Settings'} />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You can always edit your reference value for every parameter
          </Text>
        </View>
        <FDSettingDataRow
          label="Calories limit"
          value={data.calories}
          onValueChange={(val: number) => handleSetData(val, 'calories')}
        />
        <FDSettingDataRow
          label="Proteins limit"
          value={data.proteins}
          onValueChange={(val: number) => handleSetData(val, 'proteins')}
        />
        <FDSettingDataRow
          label="Fats limit"
          value={data.fats}
          onValueChange={(val: number) => handleSetData(val, 'fats')}
        />
        <FDSettingDataRow
          label="Carbs limit"
          value={data.carbs}
          onValueChange={(val: number) => handleSetData(val, 'carbs')}
        />
        <FDSettingDataRow
          label="Water intake"
          value={data.water}
          onValueChange={(val: number) => handleSetData(val, 'water')}
        />
        {changesDetected && (
          <View style={styles.updateContainer}>
            <TouchableOpacity onPress={handleSettingsUpdate}>
              <Text style={styles.update}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logout} onPress={handleLogout}>
            <Text style={styles.logoutLabel}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    paddingHorizontal: 30,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 30,
    width: '80%',
  },
  title: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 20,
  },
  updateContainer: {
    paddingTop: 18,

    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  update: {
    color: Colors.PRIMARY,
    textDecorationColor: Colors.PRIMARY,
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  logout: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 270,
    height: 55,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
  },
  logoutLabel: {
    color: Colors.PRIMARY,
    fontWeight: '500',
    fontSize: 20,
  },
});
