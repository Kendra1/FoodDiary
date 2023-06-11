import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AddConsumableScreenProps} from '../../navigation/HomeNavigator';
import {ConsumableType} from '../../constants/ConsumableType';
import FDHeader from '../../components/molecules/FDHeader';
import {Colors} from '../../constants/Colors';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import FDConsumableInput from '../../components/molecules/FDConsumableInput';
import FDPicker, {PickerItem} from '../../components/molecules/FDPicker';
import {useIsFocused} from '@react-navigation/native';
import {AppRoute} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {getConsumables} from '../../store/actions/ConsumableActions';
import {RootState} from '../../store/reducers/RootReducer';
import {Consumable} from '../../models/Consumable';
import {addConsumable} from '../../store/actions/DailyInputActions';
import {DailyConsumable} from '../../models/DailyInput';

const AddConsumableScreen: React.FC<AddConsumableScreenProps> = ({
  navigation,
  route,
}) => {
  const dispatch = useDispatch<any>();
  const [value, setValue] = useState<string>('');
  const [item, setItem] = useState<string>('');
  const [items, setItems] = useState<Array<PickerItem>>([]);
  const type: ConsumableType = route.params.type;
  const isFocused = useIsFocused();
  const {consumablesDrink, consumablesFood} = useSelector(
    (state: RootState) => state.consumables,
  );
  const {currentInput} = useSelector((state: RootState) => state.dailyInput);

  useEffect(() => {
    isFocused && dispatch(getConsumables(type));
  }, [isFocused]);

  useEffect(() => {
    if (type === ConsumableType.FOOD) {
      const newItems: Array<PickerItem> = consumablesFood.map(
        (c: Consumable) => {
          return {label: c.name, value: c.id};
        },
      );
      setItems(newItems);
    } else {
      const newItems: Array<PickerItem> = consumablesDrink.map(
        (c: Consumable) => {
          return {label: c.name, value: c.id};
        },
      );
      setItems(newItems);
    }
  }, [consumablesDrink, consumablesFood]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSetItem = (item: string) => {
    !!item && setItem(item as string);
  };

  const handleOpenAddConsumable = () => {
    navigation.navigate(AppRoute.ADD_NEW_CONSUMABLE_SCREEN, {type});
  };

  const handleSubmit = () => {
    let consumableVal: Consumable | undefined;
    if (type === ConsumableType.FOOD) {
      consumableVal = consumablesFood.find((c: Consumable) => c.id === item);
    } else {
      consumableVal = consumablesDrink.find((c: Consumable) => c.id === item);
    }

    if (consumableVal) {
      const newDailyConsumable: DailyConsumable = {
        id: '',
        consumable: consumableVal,
        quantity: Number(value),
      };
      dispatch(
        addConsumable(currentInput?.id ?? undefined, newDailyConsumable),
      );
      handleGoBack();
    }
  };

  return (
    <View style={styles.container}>
      <FDHeader
        text={`Add ${type.toLowerCase()} intake`}
        onPress={handleGoBack}
      />
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>
            Select the type of {type.toLowerCase()} you wish to add to your
            daily input. If you can’t find the right entry, feel free to update
            our list
          </Text>
          {items && (
            <FDPicker
              items={items}
              onAddNew={handleOpenAddConsumable}
              onValueChange={handleSetItem}
            />
          )}

          <Text style={styles.text2}>
            Now, you just have to tell us how much of it did you consume.
            Remember, quantity must be entered in{' '}
            <Text style={styles.textColor}>
              {type === ConsumableType.FOOD ? 'grams' : 'milliliters'}
            </Text>
          </Text>
          <FDConsumableInput
            value={value}
            onChangeValue={setValue}
            placeholder={'eg. 450'}
            type={'number'}
            unit={'grams'}
          />
        </View>
        <FDPrimaryButton text={'Submit'} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddConsumableScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 150,
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
  },
  text2: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 10,
  },
  textColor: {
    color: Colors.PRIMARY,
  },
});
