import {Dimensions, StyleSheet} from 'react-native';
import {rs} from '../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const createTextGeneratorStyle = colors => {
  return StyleSheet.create({
    pageVisibility: {
      flex: 1,
      backgroundColor: "#141414"
    },
    scroll_view: {
      flex: 1,
      backgroundColor: colors.pageBg,
    },
    container: {
      height: '100%',
      alignItems: 'center',
      paddingTop: rs(24),
      marginBottom: rs(100),
      backgroundColor: colors.pageBg,
    },
    currencyContainer: {
      marginBottom: rs(26),
    },
    inputTitle: {
      marginBottom: rs(6),
      fontFamily: 'Gilroy-Semibold',
      fontSize: rs(14),
      lineHeight: rs(17),
      color: colors.textSecondary,
    },
    contentWidth: {
      width: width - rs(80),
    },
    halfWidth: {
      width: width / 2 - rs(50),
    },
    lottie: {
      height: rs(35),
      width: rs(60),
      marginRight: rs(-18),
      marginTop: rs(-2),
    },
    halfInputAlignment: {
      flexDirection: 'row',
    },
    mr_20: {
      marginRight: rs(20),
    },
    magicButton: {
      marginVertical: rs(20),
    },
    textAreaWidth:{
      width: width - rs(80),
      height: rs(100),
    },
    br_8:{
      borderRadius: 8
    },
    remainingText:{
      color: colors.textSecondary,
      marginTop: rs(5),
    }
  });
};
