import {Dimensions, StyleSheet} from 'react-native';
import { rs } from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const selectLanguageBottomSheetStyle = colors =>
  StyleSheet.create({
    title: {
      color: colors.bottomSheetTitle,
      fontSize: rs(18),
      lineHeight: rs(22),
      fontFamily: 'Gilroy-Semibold',
      marginBottom: rs(28),
    },
    textContainer: {
      paddingVertical: rs(15),
      alignItems: 'center',
    },
    textStyle: {
      color: colors.bottomSheetItem,
      fontSize: rs(15),
      lineHeight: rs(18),
      fontFamily: 'Gilroy-Semibold',
      alignItems: 'center',
    },
    activeTextColor: {
      color: colors.textTertiaryVariant,
    },
    textBottomBorder: {
      backgroundColor: colors.borderTertiary,
      width: width - rs(40),
      height: 1,
    },
    alignCenter: {
      alignItems: 'center',
    },
  });
