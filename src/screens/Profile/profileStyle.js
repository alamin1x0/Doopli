import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const profileStyle = colors =>
  StyleSheet.create({
    onKeyboard: {flex: 1},
    scroll_view: {
      flex: 1,
      backgroundColor: colors.pageBg,
    },
    container: {
      marginBottom: rs(100),
      paddingTop: rs(24),
      paddingHorizontal: rs(20),
    },
    profileCardsComponent: {
      flexDirection: 'row',
      marginTop: rs(16),
      marginBottom: rs(24),
      justifyContent: 'space-between',
      marginBottom: rs(6),
    },
    loading: {
      marginTop: rs(120),
      width: rs(100),
      height: rs(100),
      position: 'absolute',
      left: rs(width / 2.9),
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    br_12:{
      borderRadius: 12
    },
    mrv_10:{
      marginVertical: rs(10)
    },
    navIcon:{
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    }
  });
