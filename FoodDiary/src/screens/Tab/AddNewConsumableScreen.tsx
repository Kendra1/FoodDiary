import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import FDConsumableInput from '../../components/molecules/FDConsumableInput';
import {Colors} from '../../constants/Colors';
import {Icons} from '../../constants/Icons';
import {AddNewConsumableScreenProps} from '../../navigation/HomeNavigator';
import {Consumable} from '../../models/Consumable';
import {ConsumableType} from '../../constants/ConsumableType';
import {useDispatch} from 'react-redux';
import {createConsumable} from '../../store/actions/ConsumableActions';

const AddNewConsumableScreen: React.FC<AddNewConsumableScreenProps> = ({
  navigation,
  route,
}) => {
  const {type} = route.params;
  const dispatch = useDispatch<any>();
  const [consumableName, setConsumableName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [proteins, setProteins] = useState<string>('');
  const [fats, setFats] = useState<string>('');
  const [carbs, setCarbs] = useState<string>('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    const newConsumable: Consumable = {
      id: '',
      name: consumableName,
      calories: Number(calories),
      proteins: Number(proteins),
      fats: Number(fats),
      carbs: Number(carbs),
      type:
        type === ConsumableType.FOOD
          ? ConsumableType.FOOD
          : ConsumableType.DRINK,
    };

    dispatch(createConsumable(newConsumable));
    handleGoBack();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handleGoBack} style={styles.xIcon}>
          {Icons.X}
        </TouchableOpacity>
        <View style={styles.icon}>{Icons.FOOD_RED_BIG}</View>
        <FDConsumableInput
          value={consumableName}
          label={`Enter the new type of ${type}`}
          placeholder={`eg. ${
            type === ConsumableType.FOOD ? 'Fried chicken' : 'CocaCola'
          }`}
          type="text"
          onChangeValue={setConsumableName}
        />
        <FDConsumableInput
          value={calories}
          label="Enter caloric value"
          placeholder="eg. 450"
          type="number"
          onChangeValue={setCalories}
          unit="kcal"
          per="/100g"
        />
        <FDConsumableInput
          value={proteins}
          label="Enter proteins"
          placeholder="eg. 450"
          type="number"
          onChangeValue={setProteins}
          per="/100g"
        />
        <FDConsumableInput
          value={fats}
          label="Enter fats"
          placeholder="eg. 450"
          type="number"
          onChangeValue={setFats}
          per="/100g"
        />
        <FDConsumableInput
          value={carbs}
          label="Enter fats"
          placeholder="eg. 450"
          type="number"
          onChangeValue={setCarbs}
          per="/100g"
        />
      </View>
      <FDPrimaryButton text={'Submit'} onPress={handleSubmit} />
    </View>
  );
};

export default AddNewConsumableScreen;

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
