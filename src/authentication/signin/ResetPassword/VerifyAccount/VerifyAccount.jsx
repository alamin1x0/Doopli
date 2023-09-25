import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTheme} from '@react-navigation/native';
import {useState} from 'react';
import CustomOtpInput from '../../../../screens/components/CustomTextInput/CustomOtpInput/CustomOtpInput';
import {verifyAccount} from './verifyAccount.style';
import {
  ADD_NEW_PASSWORD,
} from '../../../../navigation/routeName/routeName';
import {postInfo} from '../../../../features/auth/login/loginApi';
import CustomLoader from '../../../../screens/components/CustomLoader/CustomLoader';
import {useTranslation} from 'react-i18next';
import {handleToaster} from '../../../../utils/CustomAlert/handleAlert';
import {hideMessage} from 'react-native-flash-message';
import config from '../../../../../config';

const VerifyAccount = ({
  navigation,
  route: {
    params: {
      email,
      errorText,
      initialState,
      setSignError,
      setSignInInfo,
      setSignEmailError,
    },
  },
}) => {
  const {colors} = useTheme();
  const {t:trans} = useTranslation();
  const styles = verifyAccount(colors);
  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');

  const [errorOTP, setErrorOTP] = useState(false);
  const [loader, setLoader] = useState(false);

  const emailCrypto = email => {
    if (email.includes('@')) {
      const splitEmail = email.split('@');
      return (
        (splitEmail[0]?.length >= 3
          ? `${splitEmail[0].slice(0, 3)}...`
          : splitEmail[0]?.length >= 2
          ? `${splitEmail[0].slice(0, 2)}...`
          : splitEmail[0]) +
        '@' +
        splitEmail[1]
      );
    }
  };

  useEffect(() => {
    async function checkOTP() {
      if (otp1 && otp2 && otp3 && otp4) {
        setLoader(true);
        Keyboard.dismiss;
        let otp = otp1 + otp2 + otp3 + otp4;
        const data = {
          otp: otp,
        };
        const URL = `${config.BASE_URL}/otp-verify`;
        const res = await postInfo(data, URL, 'token', 'POST');
        handleResponse(res.response.records, res.response.status, data);
      }
    }

    checkOTP();
  }, [otp1, otp2, otp3, otp4]);

  const handleResponse = (records, status, data) => {
    setLoader(false);
    if (status.code === 200) {
      hideMessage();
      setErrorOTP(false);
      navigation.navigate(ADD_NEW_PASSWORD, {
        data,
        signInErrorText: errorText,
        signInInitialState: initialState,
        setSignError,
        setSignInInfo,
        setSignEmailError,
      });
    } else {
      setErrorOTP(true);
    }
  };

  const clearInput = () => {
    setOtp1('');
    setOtp2('');
    setOtp3('');
    setOtp4('');
  };

  const handleResend = async () => {

    clearInput();
    const URL = `${config.BASE_URL}/password/reset-link`;
    const formData = {
      email,
    };
    const res = await postInfo(formData, URL, 'token', 'POST');
    handleResendResponse(res.response.records, res.response.status);
  };

  const handleResendResponse = (records, status) => {
    if (status.code === 200) {
      handleToaster(trans(records.message), 'success', colors);
    } else {
      handleToaster(trans(status.message), 'warning', colors);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.onKeyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}>
      <ScrollView onPress={Keyboard.dismiss} scrollEnabled={false}>
        <View style={styles.container}>
          <Text style={[styles.textPos, styles.resetText]}>
            {trans('Check Your Inbox')}
          </Text>
          <Text style={[styles.textPos, styles.associatedEmailText]}>
            {`${trans('A 4 digit code has been sent to')} ${emailCrypto(email)} 
              ${trans('Use the code here')}`}
          </Text>
          <View style={styles.flexCont}>
            <CustomOtpInput
              style={styles.otpInput}
              Ref={otp1Ref}
              value={otp1}
              onChangeText={otp1 => {
                setOtp1(otp1);
                if (otp1 != '') {
                  otp2Ref.current.focus();
                }
              }}
            />
            <CustomOtpInput
              style={styles.otpInput}
              Ref={otp2Ref}
              value={otp2}
              onChangeText={otp2 => {
                setOtp2(otp2);
                if (otp2 != '') {
                  otp3Ref.current.focus();
                }
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace') {
                  setOtp1('');
                  otp1Ref.current.focus();
                }
              }}
            />
            <CustomOtpInput
              style={styles.otpInput}
              Ref={otp3Ref}
              value={otp3}
              onChangeText={otp3 => {
                setOtp3(otp3);
                if (otp3 != '') {
                  otp4Ref.current.focus();
                }
              }}
              onKeyPress={e => {
                if (e.nativeEvent.key === 'Backspace') {
                  setOtp2('');
                  otp2Ref.current.focus();
                }
              }}
            />
            <CustomOtpInput
            style={{ ...styles.otpInput, ...styles.mar_top }}
             Ref={otp4Ref}
             value={otp4}
             onChangeText={async otp4 => {
              setOtp4(otp4);
             }}
             onKeyPress={e => {
               if (e.nativeEvent.key === 'Backspace') {
                 if (otp4 === '') {
                   setOtp3('');
                   otp3Ref.current.focus();
                 } else {
                   setOtp4('');
                   otp4Ref.current.focus();
                 }
               }
             }}
            />

          </View>
          {errorOTP && (
            <Text style={styles.error}>
              {trans('Code is incorrect, try again or resend the code.')}
            </Text>
          )}
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendText}>{trans('Resend Code')}</Text>
          </TouchableOpacity>

          <Text style={styles.nbText}>
            {trans('Did not receive any code? Check your spam folder, or resend the code again')}
          </Text>
        </View>
      </ScrollView>
      {loader && <CustomLoader />}
    </KeyboardAvoidingView>
  );
};

export default VerifyAccount;
