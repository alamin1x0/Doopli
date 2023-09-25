import {Platform, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';

export const bottomTabBarIconStyle = (colors, focused) =>
  StyleSheet.create({
    bottomTabScreenOptions: {
      tabBarHideOnKeyboard: true,
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: Platform.OS === 'ios' ? rs(90) : rs(70),
        borderTopWidth: 1,
        borderTopColor: colors.ifSecondary,
        backgroundColor: colors.bottomTabBg,
      },
    },
    cont: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      color: focused ? colors.tabIconfocused : colors.tabIconUnfocused,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(10),
      lineHeight: rs(12),
      marginTop: rs(5),
    },
  });
