import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RegisterScreenProps} from '../../navigation/AuthNavigator';
import {Images} from '../../constants/Images';
import {Colors} from '../../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FDStableBlurView from '../../components/atoms/FDStableBlurView';
import FDTextInput from '../../components/molecules/FDTextInput';
import FDErrorMessage from '../../components/atoms/FDErrorMessage';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import {AppRoute} from '../../navigation/routes';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../../store/actions/AuthActions';
import {RootState} from '../../store/reducers/RootReducer';

const EMAIL_REGEX: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailErrorTitle, setEmailErrorTitle] = useState<string>('');

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<any>();
  const {initiateSetup} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (initiateSetup) {
      navigation.navigate(AppRoute.FINISH_SETUP_SCREEN);
    }
  }, [initiateSetup]);

  const handleRegister = () => {
    const firstNameCheck: boolean = firstName.trim().length === 0;
    const lastNameCheck: boolean = lastName.trim().length === 0;
    const emailCheck: boolean = email.trim().length === 0;
    const passwordCheck: boolean = password.trim().length === 0;

    if (emailCheck) {
      setEmailErrorTitle('This field is mandatory');
      setEmailError(true);
    } else {
      if (!EMAIL_REGEX.test(email)) {
        setEmailErrorTitle('Email format is not valid');
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    setFirstNameError(firstNameCheck);
    setLastNameError(lastNameCheck);
    setPasswordError(passwordCheck);

    if (!emailCheck && EMAIL_REGEX.test(email) && !passwordCheck) {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate(AppRoute.LOGIN_SCREEN);
  };

  return (
    <ImageBackground
      source={Images.BACKGROUND}
      style={[
        styles.container,
        {paddingVertical: insets.top === 0 ? 30 : insets.top},
      ]}>
      <Text style={styles.title}>Create an account</Text>
      <View style={styles.content}>
        <FDStableBlurView
          blurAmount={20}
          blurType={'light'}
          style={styles.blurContainer}
        />
        <View style={styles.innerContent}>
          <FDTextInput
            label={'First name'}
            value={firstName}
            placeholder={'ex. John'}
            onChangeText={setFirstName}
          />
          <FDErrorMessage
            text={'This field is mandatory'}
            show={firstNameError}
          />
          <FDTextInput
            label={'Last name'}
            value={lastName}
            placeholder={'ex. Doe'}
            onChangeText={setLastName}
          />
          <FDErrorMessage
            text={'This field is mandatory'}
            show={lastNameError}
          />
          <FDTextInput
            label={'Email address'}
            value={email}
            placeholder={'ex. someone@somewhere.com'}
            onChangeText={setEmail}
          />
          <FDErrorMessage text={emailErrorTitle} show={emailError} />
          <FDTextInput
            label={'Password'}
            value={password}
            password
            placeholder={'Enter your password'}
            onChangeText={setPassword}
          />
          <FDErrorMessage
            text={'This field is mandatory'}
            show={passwordError}
          />
          <FDPrimaryButton text={'Sign up'} onPress={handleRegister} />
          <TouchableOpacity
            onPress={handleGoToRegister}
            style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Or sign in <Text style={styles.underlineText}>here!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* ovo dodali samo da bi mogli da centriramo formu? */}
      <View />
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.BLACK,
    width: '50%',
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
  innerContent: {
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  signInContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  signInText: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
