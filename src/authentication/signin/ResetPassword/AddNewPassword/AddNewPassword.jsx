import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  BackHandler,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {resetPasswordStyle} from '../ResetPassword.style';
import CustomInput from '../../../../screens/components/CustomInput/CustomInput';
import EyeIcon from '../../../../assets/svg/eye.svg';
import EyeOffIcon from '../../../../assets/svg/eye-off.svg';
import LockIcon from '../../../../assets/svg/lock-unlocked.svg';
import {useState} from 'react';
import {useEffect} from 'react';
import CustomButton from '../../../../screens/components/Buttons/CustomButton/CustomButton';
import {
  PASSWORD_CHANGE_SUCCESS,
  SIGN_IN,
} from '../../../../navigation/routeName/routeName';
import {handleSetInfo} from '../../../../screens/utilities/handleFromData/handleFromData';
import {postInfo} from '../../../../features/auth/login/loginApi';
import Lottie from 'lottie-react-native';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import config from '../../../../../config';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';


const AddNewPassword = props => {
  const {navigation} = props;
  const initialState = {
    newPassword: '',
    confirmPassword: '',
  };
  const errorText = {
    newPassword: false,
    confirmPassword: false,
  };
  const {t:trans} = useTranslation();

  const {colors} = useTheme();
  const styles = resetPasswordStyle(colors);
  const [showCPassword, setShowCPassword] = useState(true);

  let controlBackHandler;

  useEffect(() => {
    controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }, []);

  const handleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const {
    signInErrorText,
    signInInitialState,
    setSignError,
    setSignInInfo,
    setSignEmailError,
  } = props.route.params;

  const [matchPassword, setMatchPassword] = useState(true);
  const [password, setPassword] = useState(initialState);
  const [error, setError] = useState(errorText);
  const [loader, setLoader] = useState(false);

  const handleError = () => {
    const {newPassword, confirmPassword} = password;
    const errorNewPassword = newPassword === '' ? true : false;
    const errorConfirmPassword = confirmPassword === '' ? true : false;
    setError({
      ...error,
      newPassword: errorNewPassword,
      confirmPassword: errorConfirmPassword,
    });
  };
  const handleSubmit = async () => {
    const {newPassword, confirmPassword} = password;
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        setLoader(true);
        if (confirmPassword.length < 4) {
          setLoader(false);
          handleToaster(
            trans('Password should be at least 4 characters.'),
            'warning',
            colors,
          );
        } else {
          setMatchPassword(false);
          const changePasswordData = {
            token: props.route.params.data.otp,
            password: newPassword,
            password_confirmation: confirmPassword
          };
          const URL = `${config.BASE_URL}/password/reset?token=${changePasswordData.token}&password=${changePasswordData.password}&password_confirmation=${changePasswordData.password_confirmation}`;
         
          const res = await postInfo(changePasswordData, URL, 'token', 'POST');
          handleResponse(res.response.records, res.response.status);
        }
      } else {
        setMatchPassword(true);
      }
    } else {
      handleError();
    }
  };

  useEffect(() => {
    if (matchPassword) {
      if (password.confirmPassword === password.newPassword) {
        setMatchPassword(false);
      }
    }
  }, [password.confirmPassword, password.newPassword, matchPassword]);

  const handleResponse = (records, status) => {
    setLoader(false);
    if (status.code === 200) {
      hideMessage();
      setSignEmailError(false);
      setSignError(signInErrorText);
      setSignInInfo(signInInitialState);
      navigation.navigate(PASSWORD_CHANGE_SUCCESS);
    } else {
      handleToaster(trans(status.message), 'error', colors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={[styles.textPos, styles.resetText]}>
            {trans('Enter New Password')}
          </Text>
          <Text style={[styles.textPos, styles.associatedEmailText]}>
            {trans('Your new password must be different from previously used passwords.')}
          </Text>
          <View style={resetPasswordStyle(colors).mb_16}>
            <CustomInput
              placeholder={trans('Password')}
              leftIcon={<LockIcon fill={colors.textQuinary} />}
              rightIcon={
                <Pressable onPress={() => handleShowCPassword()}>
                  {showCPassword ? (
                    <EyeOffIcon fill={colors.btnQuaternary} />
                  ) : (
                    <EyeIcon fill={colors.btnQuaternary} />
                  )}
                </Pressable>
              }
              onChangeText={text =>
                handleSetInfo(
                  'newPassword',
                  text,
                  setPassword,
                  password,
                  setError,
                  error,
                )
              }
              isPasswordStep={true}
              secureTextEntry={showCPassword}
              style={styles.contentWidth}
              isError={error.newPassword && !password.newPassword}
              error={trans('This field is required.')}
            />
          </View>
          <CustomInput
            placeholder={trans('Confirm Password')}
            leftIcon={<LockIcon fill={colors.textQuinary} />}
            isPasswordStep={true}
            style={styles.contentWidth}
            secureTextEntry={showCPassword}
            onChangeText={text =>
              handleSetInfo(
                'confirmPassword',
                text,
                setPassword,
                password,
                setError,
                error,
              )
            }
            isError={
              matchPassword ||
              (error.confirmPassword && !password.confirmPassword)
            }
            error={
              matchPassword
                ? trans('Password did not match')
                : error.confirmPassword
                ? trans('This field is required.')
                : ''
            }
          />
          <View style={styles.vm_20}>
            <LinearGradient
              colors={['#A26EF7', '#763CD4']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.br_8}
              >
              <CustomButton
                title={
                  !loader ? (
                    trans('Reset Password')
                  ) : (
                    <Lottie
                      source={require('../../../../assets/lottie/lf30_editor_15agdwbd.json')}
                      autoPlay
                    />
                  )
                }
                onPress={!loader ? handleSubmit : null}
                style={styles.inputWidth}
                color={colors.white}
              />
            </LinearGradient>
          </View>
          <Pressable onPress={() => navigation.navigate(SIGN_IN)}>
            <Text style={styles.cancelBtn}>{trans('Cancel')}</Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddNewPassword;
