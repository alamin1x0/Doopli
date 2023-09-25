import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const signInStyle = colors =>
  StyleSheet.create({
    pageVisibility: {
      flex: 1,
      backgroundColor: colors.pageBg,
    },
    signInContainer: {
      alignItems: 'center',
    },
    payMoneyIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: rs(50),
    },
    welcomeText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(25),
      color: colors.ifDenary,
      marginTop: rs(25),
      marginBottom: rs(20),
    },
    passwordInputContainer: {
      marginTop: rs(16),
    },
    accountText: {
      fontFamily: 'Gilroy-Medium',
      color: colors.textQuinary,
    },
    registerText: {
      fontFamily: 'Gilroy-Semibold',
      color: colors.textNonaryVariant,
    },
    accountRegisterText: {
      marginTop: rs(24),
      fontSize: rs(14),
      lineHeight: rs(17),
      marginBottom: rs(30),
    },
    forgetPassSection: {
      marginTop: rs(17),
      marginBottom: rs(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width - rs(80),
    },
    inputWidth: {
      width: width - rs(80),
    },
    forgotPassText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(15),
      color: colors.textTertiary,
    },
    imageLogo: {height: rs(41), width: rs(170),  resizeMode: 'contain'},
    headerImageLogo: {height: rs(32), width: rs(133), resizeMode: 'contain'},
    br_8:{
      borderRadius: 8
    }
  });
