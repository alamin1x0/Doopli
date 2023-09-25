import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import {RESET_PASSWORD, SIGN_UP} from '../../navigation/routeName/routeName';
import Logo from '../../assets/image/logo/white_logo.png';
import DarkLogo from '../../assets/image/logo/dark_logo.png';
import {useTheme} from '@react-navigation/native';
import {signInStyle} from './SignInStyle';
import CustomInput from '../../screens/components/CustomInput/CustomInput';
import MailIcon from '../../assets/svg/user-01.svg';
import Lottie from 'lottie-react-native';
import LockIcon from '../../assets/svg/lock-unlocked.svg';
import EyeIcon from '../../assets/svg/eye.svg';
import EyeOffIcon from '../../assets/svg/eye-off.svg';
import {useState, useContext} from 'react';
import CustomButton from '../../screens/components/Buttons/CustomButton/CustomButton';
import {handleSetInfo} from '../../screens/utilities/handleFromData/handleFromData';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../features/auth/login/loginSlice';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import {NetworkContext} from '../../utils/Network/NetworkProvider';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


const SignIn = ({navigation}) => {
  const {theme} = useSelector(state => state.themeReducer);
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const {loginLoader} = useSelector(state => state.loginUserReducer);
  const {isConnected} = useContext(NetworkContext);
  const {Preferences} = useSelector(state => state.getPreferences);
  const initialState = {
    email: '',
    password: '',
  };
  const errorText = {
    email: false,
    password: false,
  };

  const {
    signInContainer,
    payMoneyIcon,
    welcomeText,
    passwordInputContainer,
    accountRegisterText,
    accountText,
    registerText,
    forgetPassSection,
    inputWidth,
    forgotPassText,
    pageVisibility,
    imageLogo,
    br_8
  } = signInStyle(colors);

  const [emailError, setEmailError] = useState(false);
  const [signInInfo, setSignInInfo] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [validEmail, setValidEmail] = useState(false);
  const [eye, setEye] = useState(true);
 
  const handleError = () => {
    const {email, password} = signInInfo;
    const errorEmail = email === '' ? true : false;
    const errorPassword = password === '' ? true : false;
    setError({
      ...error,
      email: errorEmail,
      password: errorPassword,
    });
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    const {email, password} = signInInfo;
    if (email && password && isConnected) {
      const res = await dispatch(loginUser(signInInfo));
      if (res) {
        loginHandler(res.payload);
      }
    } else {
      handleError();
    }
  };

  const loginHandler = res => {
    const {code, message} = res.response.status;
    if (code !== 200) {
      handleToaster(trans(message), 'warning', colors);
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate(SIGN_UP,{setSignInInfo});
    hideMessage();
  };


  return (
    <>
      <SafeAreaView style={pageVisibility}>
        <StatusBar
          backgroundColor={colors.pageBg}
          barStyle={colors.statusBarColor}
        />

        <ScrollView style={pageVisibility} keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={signInContainer}>
              <View style={payMoneyIcon}>
                <Image
                  style={imageLogo}
                  source={theme === 'dark' ? {uri: Preferences[0]?.company?.company_logo_dark }: {uri: Preferences[0]?.company?.company_logo_light}}
                  alt={trans('Logo')}
                />
              </View>
              <View>
                <Text style={welcomeText}>{trans('Welcome')}</Text>
              </View>
              <View style={passwordInputContainer}>
                <CustomInput
                  style={inputWidth}
                  leftIcon={<MailIcon fill={colors.mailIcon} />}
                  placeholder={trans('Email')}
                  keyboardAppearance={'dark'}
                  keyboardType={'email-address'}
                  inputMode={'email'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={signInInfo.email}
                  onChangeText={text =>
                    handleSetInfo(  
                      'email',
                      text,
                      setSignInInfo,
                      signInInfo,
                      setError,
                      error,
                      setValidEmail,
                      setEmailError,
                    )
                  }
                  isError={error.email && !signInInfo.email}
                  error={error.email ? trans('This field is required.') : ''}
                  returnKeyType={'done'}
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
                  value={signInInfo.password}
                  onChangeText={text =>
                    handleSetInfo(
                      'password',
                      text,
                      setSignInInfo,
                      signInInfo,
                      setError,
                      error,
                    )
                  }
                  isError={error.password && !signInInfo.password}
                  error={trans('This field is required.')}
                  secureTextEntry={eye}
                />
              </View>
              <View style={forgetPassSection}>
                <Text
                  style={forgotPassText}
                  onPress={() =>
                    navigation.navigate(RESET_PASSWORD, {
                      setSignInInfo: setSignInInfo,
                      initialState: initialState,
                      setSignError: setError,
                      errorText: errorText,
                      setEmailError: setEmailError,
                      setSignEmailError: setEmailError,
                    })
                  }>
                  {`${trans('Forgot Password')}?`}
                </Text>
              </View>
              <LinearGradient
                  colors={['#A26EF7', '#763CD4']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={br_8}
                  >
                  <CustomButton
                    style={inputWidth}
                    onPress={!loginLoader ? handleLogin : null}
                    title={
                      !loginLoader ? (
                        trans('Sign In')
                      ) : (
                        <Lottie
                          source={require('../../assets/lottie/lf30_editor_15agdwbd.json')}
                          autoPlay
                        />
                      )
                    }
                    color={colors.white}
                  />
              </LinearGradient>
              <Text style={accountRegisterText}>
                <Text style={accountText}>
                  {trans('Don’t have an account?')}{' '}
                  <Text onPress={handleRegisterNavigation} style={registerText}>
                    {trans('Register Now')}
                  </Text>
                </Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
