import {I18nManager, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';

export const styles = StyleSheet.create({});

export const screenOptions = (colors,theme) => ({
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: theme === 'dark' ? '#333332' : '#141414',
  },
  headerTintColor: colors.textSenary,
  animation: !I18nManager.isRTL ? 'slide_from_right' : 'slide_from_left',
  animationDuration: 400,
  headerTitleStyle: {
    fontSize: rs(18),
    fontFamily: 'Gilroy-Semibold',
  },
});
