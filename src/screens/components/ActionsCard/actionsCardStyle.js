import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import {rs} from '../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const actionsCardStyle = (
  colors,
  bg,
  textColor,
  borderColor,
  last,
  fixedWidth,
  icon,
  theme,
  isOneLine
) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme==='dark' ? '#3A3A39' : '#ffffff',
      borderColor: borderColor ? borderColor : colors.ifSecondary,
      borderWidth: 1,
      padding: rs(15),
      width: fixedWidth ? fixedWidth : width / 3 - rs(20),
      borderRadius: 8,
    },
    container: {
      marginBottom: last ? rs(0) : rs(12),
      borderRadius: 8,
      overflow: 'hidden',
    },
    flex: {
      alignItems: icon ? 'flex-start':'center',
      justifyContent: 'center',
    },
    isOneLineContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textS: {
      marginTop: icon && !isOneLine? rs(10): 0,
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(22),
      color: textColor ? textColor : colors.textSecondary,
      marginLeft: isOneLine ? rs(20) : rs(0),
    },
    generatorText:{
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(22),
      color: textColor ? textColor : colors.textSecondary,
    },
    iconNavContainer: {
      flexDirection:'row',
      alignItems:"center", 
      justifyContent:"space-between"
    },
    navIcon:{
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    }
  });
