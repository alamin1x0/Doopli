import {Dimensions, StyleSheet} from 'react-native';
import { rs } from '../../../../utils/styles/responsiveSize';
const {width} = Dimensions.get('screen');
export const useCaseSheetStyle = colors => {
  return StyleSheet.create({
    headerText:{
        textAlign: 'center',
        marginVertical: rs(10)
    },
    textStyle: {
      color: colors.bottomSheetItem,
      fontSize: rs(15),
      lineHeight: rs(18),
      fontFamily: 'Gilroy-Semibold',
      textAlign: 'left',
      alignItems:'flex-start',
    },
    textContainer: {
      paddingVertical: rs(15),
      alignItems: 'flex-start',
      marginLeft: rs(20)
    },
  });
};
