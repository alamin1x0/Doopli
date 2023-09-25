import {StyleSheet,Platform} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';

export const drawerStyle = (colors, focused, routeName, last) =>{
  return StyleSheet.create({
    drawerCont: {
      backgroundColor: colors.bgPrimaryVariant,
      flex: 1,
      top: 0,
      bottom: 0,
    },
    header: {
      backgroundColor: "#474746",
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: rs(24),
      paddingBottom: rs(27),
      paddingRight: rs(70),
      paddingTop: Platform.OS === 'ios' ? rs(70): rs(27)
    },
    headerTextCont: {
      marginLeft: rs(12),
    },
    headerNameText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(20),
      color: colors.whisper,
    },
    headerEmailText: {
      fontFamily: 'Gilroy-Medium',
      fontSize: rs(11),
      lineHeight: rs(13),
      color: colors.whisper,
      marginTop: rs(5),
    },
    drawerItemCont: {
      marginHorizontal: rs(24),
      borderBottomWidth: 1,
      borderColor: colors.borderDenary,
      margin: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingVertical: rs(2),
    },
    itemCont: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: focused === routeName ? colors.white : colors.lavenderGray,
      marginLeft: rs(15),
      borderBottomWidth: last && 0,
    },
    mt_8: {marginTop: rs(6)},
  });
}

export const drawerButtonStyle = colors =>
  StyleSheet.create({
    drawerCont: {
      backgroundColor: "#292929",
      flex: 1,
      top: 0,
      bottom: 0,
      paddingTop: 0,
    },
    p_20: {padding: rs(20)},
    drawerItemCont: {
      marginHorizontal: rs(24),
      borderBottomWidth: 0,
      borderColor: colors.borderDenary,
      margin: 0,
      marginTop: 0,
      marginBottom: 0,
      paddingVertical: rs(2),
    },
  });
