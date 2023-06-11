import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FDErrorMessage from '../../components/atoms/FDErrorMessage';
import FDPrimaryButton from '../../components/atoms/FDPrimaryButton';
import FDStableBlurView from '../../components/atoms/FDStableBlurView';
import FDTextInput from '../../components/molecules/FDTextInput';
import {Images} from '../../constants/Images';
import {Colors} from '../../constants/Colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ResetPasswordScreenProps} from '../../navigation/AuthNavigator';
import {useDispatch} from 'react-redux';
import {resetPassword} from '../../store/actions/AuthActions';
import {AppRoute} from '../../navigation/routes';

const EMAIL_REGEX: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorTitle, setEmailErrorTitle] = useState<string>('');

  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<any>();

  const handleSubmit = () => {
    const emailCheck: boolean = email.trim().length === 0;

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

    if (!emailCheck && EMAIL_REGEX.test(email)) {
      dispatch(resetPassword(email));
      navigation.navigate(AppRoute.LOGIN_SCREEN);
    }
  };

  return (
    <ImageBackground
      source={Images.BACKGROUND}
      style={[
        styles.container,
        {paddingVertical: insets.top === 0 ? 30 : insets.top},
      ]}>
      <Text style={styles.title}>Reset password</Text>
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
          <FDPrimaryButton text={'Submit'} onPress={handleSubmit} />
        </View>
      </View>
      <View />
    </ImageBackground>
  );
};

export default ResetPasswordScreen;

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
  signUpContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  signUpText: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
});
