import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import React from 'react';
import {resetPasswordStyle} from './ResetPassword.style';
import {useTheme} from '@react-navigation/native';
import MailIcon from '../../../assets/svg/mail-01.svg';
import CheckIcon from '../../../assets/svg/check-eucalyptus.svg';
import {useState} from 'react';
import CustomButton from '../../../screens/components/Buttons/CustomButton/CustomButton';
import CustomInput from '../../../screens/components/CustomInput/CustomInput';
import {ACCOUNT_VERIFY} from '../../../navigation/routeName/routeName';
import {handleSetInfo} from '../../../screens/utilities/handleFromData/handleFromData';
import {postInfo} from '../../../features/auth/login/loginApi';
import Lottie from 'lottie-react-native';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import config from '../../../../config';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useEffect } from 'react';
import { getPreferences } from '../../../features/slices/Preferences/getPreferences';

const URL = `${config.BASE_URL}/password/reset-link`;
const ResetPassword = props => {
  const {t:trans} = useTranslation();
  const dispatch = useDispatch();
  const {navigation} = props;
  const {theme} = useSelector(state => state.themeReducer);
  const {colors} = useTheme();
  const styles = resetPasswordStyle(colors);
  const [formData, setFormData] = useState({email: ''});
  const [emailError, setEmailError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [error, setError] = useState({email: error});
  const [loader, setLoader] = useState(false);
  const [preference, setPreference] = useState(null);

  useEffect(()=>{
    async function checkPreferences(){
      const test= await dispatch(getPreferences('token'));
      setPreference(test.payload[0].verification.email);
    }
    checkPreferences();
  },[])

  const handleSend = async () => {
    Keyboard.dismiss();
    if (validEmail) {
      setLoader(true);
      const res = await postInfo(formData, URL, 'token', 'POST');
      handleResponse(res.response.status, res.response.records);
    } else {
      setError({...error, email: true});
    }
  };

  const {
    errorText,
    initialState,
    setSignError,
    setSignInInfo,
    setSignEmailError,
  } = props.route.params;

  const handleResponse = (status, records) => {
    setLoader(false);
    if (status.code === 200 && preference !=='token') {
      hideMessage();
      navigation.navigate(ACCOUNT_VERIFY, {
        email: formData.email,
        errorText,
        initialState,
        setSignError,
        setSignInInfo,
        setSignEmailError,
      });
    }
    else if(status.code === 200 && preference ==='token'){
      handleToaster(trans(records.message),'success',colors);
    }
     else {
      (Object.keys(records).length>0) ?
        handleToaster(trans(Object.values(records)[0]),'warning',colors)
      :
      handleToaster(trans(status.message), 'warning', colors);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={theme === 'dark' ? '#333332' : '#141414'}
        barStyle={'light-content'}
      />
      <KeyboardAvoidingView
        style={styles.onKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={[styles.textPos, styles.resetText]}>
              {trans('Reset Your Password')}
            </Text>
            <Text style={[styles.textPos, styles.associatedEmailText]}>
              {trans('Don’t worry. Please enter the email address associated with your account')}
            </Text>
            <View style={styles.inputContainer}>
              <CustomInput
                style={styles.inputWidth}
                leftIcon={<MailIcon fill={colors.mailIcon} />}
                rightIcon={validEmail && <CheckIcon fill={"#2AAA5E"} />}
                placeholder={trans('Email Address')}
                keyboardAppearance={'dark'}
                keyboardType={'email-address'}
                inputMode={'email'}
                autoCapitalize={'none'}
                autoCorrect={false}
                value={formData.email}
                onChangeText={text =>
                  handleSetInfo(
                    'email',
                    text,
                    setFormData,
                    formData,
                    setError,
                    error,
                    setValidEmail,
                    setEmailError,
                  )
                }
                isError={emailError || (error.email && !formData.email)}
                error={
                  emailError
                    ? trans('Your email is not valid!')
                    : error.email
                    ? trans('This field is required.')
                    : ''
                }
              />
            </View>
            <View style={styles.btnContainer}>
              <LinearGradient
                  colors={['#A26EF7', '#763CD4']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.br_8}
                  >
                  <CustomButton
                    onPress={!loader ? handleSend : null}
                    style={styles.inputWidth}
                    title={
                      !loader ? (
                        trans('Send')
                      ) : (
                        <Lottie
                          source={require('../../../assets/lottie/lf30_editor_15agdwbd.json')}
                          autoPlay
                        />
                      )
                    }
                    color={colors.white}
                  />
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.backText} onPress={() => navigation.goBack()}>
                {trans('Back to Sign in')}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPassword;
