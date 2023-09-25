import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import MyStatusBar from '../../../../utils/MyStatusBar/MyStatusBar';
import {passwordChangeSuccessStyle} from './passwordChangeSuccess.style';
import {SIGN_IN} from '../../../../navigation/routeName/routeName';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import Lottie from 'lottie-react-native';
import { ChangeSuccessStyle } from './ChangeSuccessStyle';

const PasswordChangeSuccess = ({navigation}) => {
  const {t:trans} = useTranslation();
  const {colors} = useTheme();
  const styles = passwordChangeSuccessStyle(colors);
  const SuccessMoneyReqstyles = ChangeSuccessStyle(colors);
  const ref = useRef();
  const scheme = useColorScheme();
  useEffect(() => {
    const controlBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    setTimeout(() => {
      navigation.navigate(SIGN_IN);
      controlBackHandler?.remove();
    }, 3000);
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current?.play();
    }
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll_view}
      keyboardShouldPersistTaps={'always'}>
      <MyStatusBar
        backgroundColor={colors.bgSecondary}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <View
          style={{
            ...SuccessMoneyReqstyles.successLoader,
            ...styles.iconAlignment,
          }}>
          <Lottie
            ref={ref}
            source={require('../../../../assets/lottie/successLoader.json')}
            autoPlay={false}
            loop={false}
          />
        </View>
        <Text style={styles.successHeader}>
          {trans('Password Changed Successfully.')}
        </Text>
        <Text style={styles.description}>
          {trans('Use your new password to sign in now.')}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PasswordChangeSuccess;
