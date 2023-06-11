import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {LoginScreenProps} from '../../navigation/AuthNavigator';
import {Images} from '../../constants/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FDStableBlurView from '../../components/atoms/FDStableBlurView';
import {Colors} from '../../constants/Colors';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import FDTextInput from '../../components/molecules/FDTextInput';
import {AppRoute} from '../../navigation/routes';
import FDErrorMessage from '../../components/atoms/FDErrorMessage';
import {useDispatch} from 'react-redux';
import {login} from '../../store/actions/AuthActions';

const EMAIL_REGEX: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [emailErrorTitle, setEmailErrorTitle] = useState<string>('');

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const handleLogin = () => {
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

    setPasswordError(passwordCheck);

    if (!emailCheck && EMAIL_REGEX.test(email) && !passwordCheck) {
      dispatch(login(email, password));
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate(AppRoute.REGISTER_SCREEN);
  };

  const handleForgottenPassword = () => {
    navigation.navigate(AppRoute.RESET_PASSWORD_SCREEN);
  };

  return (
    <ImageBackground
      source={Images.BACKGROUND}
      style={[
        styles.container,
        {paddingVertical: insets.top === 0 ? 30 : insets.top},
      ]}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.content}>
        <FDStableBlurView
          blurAmount={20}
          blurType={'light'}
          style={styles.blurContainer}
        />
        <View style={styles.innerContent}>
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
            style={styles.passwordInput}
          />
          <FDErrorMessage
            text={'This field is mandatory'}
            show={passwordError}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text
              style={styles.forgotPasswordText}
              onPress={handleForgottenPassword}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <FDPrimaryButton text={'Login'} onPress={handleLogin} />
          <TouchableOpacity
            onPress={handleGoToRegister}
            style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Or sign up <Text style={styles.underlineText}>here!</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View />
    </ImageBackground>
  );
};

export default LoginScreen;

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
  passwordInput: {
    marginTop: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginVertical: 10,
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  signUpText: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});
