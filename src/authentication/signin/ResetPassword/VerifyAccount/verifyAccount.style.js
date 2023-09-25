import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {height, width} = Dimensions.get('screen');
export const verifyAccount = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: rs(40),
      backgroundColor: colors.pageBg,
      paddingHorizontal: rs(40),
      height: height,
    },
    error: {
      marginTop: rs(12),
      color: colors.ifOctonary,
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      textAlign: 'center',
    },
    textPos: {
      textAlign: 'center',
    },
    resetText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(25),
      color: colors.textSecondary,
      marginBottom: rs(12),
    },
    associatedEmailText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textTertiary,
      marginBottom: rs(24),
    },
    resendText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(16),
      lineHeight: rs(20),
      color: colors.textQuinary,
      marginTop: rs(32),
    },
    flexCont: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: width - rs(80),
      alignItems: 'center',
      justifyContent: 'center',
    },
    otpInput: {
      marginRight: 17,
    },
    mar_top: {
      marginTop: rs(24),
    },
    nbText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(12),
      lineHeight: rs(20),
      color: colors.textQuinary,
      textAlign: 'center',
      marginTop: rs(175),
    },
  });
