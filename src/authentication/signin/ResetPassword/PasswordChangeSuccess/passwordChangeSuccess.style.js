import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../../../utils/styles/responsiveSize';
const {height} = Dimensions.get('screen');
export const passwordChangeSuccessStyle = colors =>
  StyleSheet.create({
    scroll_view: {
      flex: 1,
      height: height,
      backgroundColor: colors.bgSecondary,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors.bgSecondary,
      paddingTop: rs(207),
    },
    successHeader: {
      marginTop: rs(36),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(20),
      lineHeight: rs(30),
      textAlign: 'center',
      color: colors.textSecondary,
    },
    description: {
      fontFamily: 'Gilroy-Medium',
      color: colors.textQuinary,
      fontSize: rs(14),
      lineHeight: rs(20),
      textAlign: 'center',
      marginTop: rs(16),
    },
    iconAlignment: {
      top: rs(8),
    },
  });
