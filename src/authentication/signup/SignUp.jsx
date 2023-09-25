import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';
import React from 'react';
import {signInStyle} from '../signin/SignInStyle';
import {useTheme} from '@react-navigation/native';
import UserIcon from '../../assets/svg/user-01.svg';
import LockIcon from '../../assets/svg/lock-unlocked.svg';
import EyeIcon from '../../assets/svg/eye.svg';
import EyeOffIcon from '../../assets/svg/eye-off.svg';
import MailIcon from '../../assets/svg/mail-01.svg';
import {useState} from 'react';
import CustomInput from '../../screens/components/CustomInput/CustomInput';
import {signUpStyle} from './SignUpStyle';
import CustomButton from '../../screens/components/Buttons/CustomButton/CustomButton';
import {MAIN_STACK, SIGN_IN} from '../../navigation/routeName/routeName';
import {handleSetInfo} from '../../screens/utilities/handleFromData/handleFromData';
import {registerUser} from '../../features/auth/registration/registrationSlice';
import {useDispatch, useSelector} from 'react-redux';
import Lottie from 'lottie-react-native';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignUp = ({navigation,route}) => {
  const {colors} = useTheme();
  const {theme} = useSelector(state => state.themeReducer);
  const dispatch = useDispatch();
  const {registrationLoader} = useSelector(state => state.registrationReducer);
  const {Preferences} = useSelector(state => state.getPreferences);
  const {t:trans} = useTranslation();
  const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };
  const errorText = {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
  };
  const [signUpInfo, setSignUpInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [eye, setEye] = useState(true);
  const [preference, setPreference] = useState(null);


  const handleError = () => {
    const {first_name, last_name, email, password} = signUpInfo;
    const errorFirstName = first_name === '' ? true : false;
    const errorLastName = last_name === '' ? true : false;
    const errorEmail = email === '' ? true : false;
    const errorPassword = password === '' ? true : false;

    setError({
      ...error,
      first_name: errorFirstName,
      last_name: errorLastName,
      email: errorEmail,
      password: errorPassword,
    });
  };


  const handleSubmit = async () => {
    Keyboard.dismiss();
    const {first_name, last_name, email, password} = signUpInfo;
    if (first_name && last_name && email && password && validEmail) {
      if (password.length < 4) {
        handleToaster(
          trans('Password should be at least 4 characters.'),
          'warning',
          colors,
        );
      } else {
          const res = await dispatch(registerUser(signUpInfo));
          handleRegistration(
            res.payload.response.records,
            res.payload.response.status,
          );
      }
    } else {
      handleError();
    }
  };

  const handleRegistration = async (records, status) => {
    let code=status.code;
    if (code == 200 || code==201) {
      handleToaster(trans(status.message), 'success', colors);
      navigation.replace('show-always', {screen: MAIN_STACK});
    } else {
       Object.keys(records).length>0 ?
      handleToaster(trans(Object.values(records)[0][0]), 'warning', colors):
      handleToaster(trans(status.message), 'warning', colors);
    }
  };

  const {
    signInContainer,
    payMoneyIcon,
    welcomeText,
    passwordInputContainer,
    accountRegisterText,
    accountText,
    registerText,
    inputWidth,
    pageVisibility,
    imageLogo,
    br_8
  } = signInStyle(colors);

  const {
    termsConditionsText,
  } = signUpStyle(colors);


  const handleSigninNavigation = () => {
    const {setSignInInfo } = route?.params || {};
    setSignInInfo && setSignInInfo({email: '', password: ''});
    navigation.navigate(SIGN_IN);
    hideMessage();
  };

  return (
    <SafeAreaView style={pageVisibility}>
        <StatusBar
          backgroundColor={colors.pageBg}
          barStyle={colors.statusBarColor}
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={pageVisibility}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <View style={signInContainer}>
            <View style={payMoneyIcon}>
               <Image
                  style={imageLogo}
                  source={theme === 'dark' ? {uri: Preferences[0]?.company?.company_logo_dark }: {uri: Preferences[0]?.company?.company_logo_light}}
                  alt={trans('Logo')}
                />
            </View>
            <View>
              <Text style={welcomeText}>{trans('Join us now')}</Text>
            </View>
            <View style={passwordInputContainer}>
              <CustomInput
                style={inputWidth}
                leftIcon={<UserIcon fill={colors.mailIcon} />}
                placeholder={trans('First Name')}
                keyboardAppearance={'dark'}
                value={signUpInfo.first_name}
                onChangeText={text =>
                  handleSetInfo(
                    'first_name',
                    text,
                    setSignUpInfo,
                    signUpInfo,
                    setError,
                    error,
                  )
                }
                isError={error.first_name && !signUpInfo.first_name}
                error={trans('This field is required.')}
              />
            </View>
            <View style={passwordInputContainer}>
              <CustomInput
                style={inputWidth}
                leftIcon={<UserIcon fill={colors.mailIcon} />}
                placeholder={trans('Last Name')}
                keyboardAppearance={'dark'}
                value={signUpInfo.last_name}
                onChangeText={text =>
                  handleSetInfo(
                    'last_name',
                    text,
                    setSignUpInfo,
                    signUpInfo,
                    setError,
                    error,
                  )
                }
                isError={error.last_name && !signUpInfo.last_name}
                error={trans('This field is required.')}
              />
            </View>
            <View style={passwordInputContainer}>
              <CustomInput
                style={inputWidth}
                leftIcon={<MailIcon fill={colors.mailIcon} />}
                placeholder={trans('Email Address')}
                keyboardAppearance={'dark'}
                keyboardType={'email-address'}
                inputMode={'email'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={signUpInfo.email}
                onChangeText={text =>
                  handleSetInfo(
                    'email',
                    text,
                    setSignUpInfo,
                    signUpInfo,
                    setError,
                    error,
                    setValidEmail,
                    setEmailError,
                  )
                }
                isError={(error.email && !signUpInfo.email) || emailError}
                error={
                  emailError
                    ? trans('Your email is not valid!')
                    : error.email
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <View style={passwordInputContainer}>
              <CustomInput
                style={inputWidth}
                leftIcon={<LockIcon fill={colors.mailIcon} />}
                rightIcon={
                  <TouchableOpacity onPress={() => setEye(!eye)}>
                    {eye ? (
                      <EyeOffIcon fill={colors.btnQuaternary} />
                    ) : (
                      <EyeIcon fill={colors.btnQuaternary} />
                    )}
                  </TouchableOpacity>
                }
                placeholder={trans('Password')}
                keyboardAppearance={'dark'}
                value={signUpInfo.password}
                onChangeText={text =>
                  handleSetInfo(
                    'password',
                    text,
                    setSignUpInfo,
                    signUpInfo,
                    setError,
                    error,
                  )
                }
                isError={error.password && !signUpInfo.password}
                error={trans('This field is required.')}
                secureTextEntry={eye}
              />
            </View>
        
            <View style={inputWidth}>
              <Text style={termsConditionsText}>
                {trans('By creating an account, you agree to our terms & conditions')}
              </Text>
            </View>
            <View>
            <LinearGradient
                colors={['#A26EF7', '#763CD4']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={br_8}
                >
              <CustomButton
                style={inputWidth}
                color={colors.white}
                onPress={!registrationLoader ? handleSubmit : null}
                title={
                  !registrationLoader ? (
                    trans('Create Account')
                  ) : (
                    <Lottie
                      source={require('../../assets/lottie/lf30_editor_15agdwbd.json')}
                      autoPlay
                    />
                  )
                }
              />
            </LinearGradient>
            </View>
            <Text style={accountRegisterText}>
              <Text style={accountText}>
                {trans('Already have an account?')}{' '}
                <Text onPress={handleSigninNavigation} style={registerText}>
                  {trans('Sign in Now')}
                </Text>
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
