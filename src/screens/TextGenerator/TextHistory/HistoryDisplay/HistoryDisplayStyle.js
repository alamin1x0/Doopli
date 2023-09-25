import {Dimensions, StyleSheet} from 'react-native';
import { rs } from '../../../../utils/styles/responsiveSize';

const {width} = Dimensions.get('screen');
export const historyDisplayStyle = colors => {
  return StyleSheet.create({
    disableSelectField:{
      backgroundColor: colors.bgQuinary, 
      borderColor: colors.borderPrimary 
    },
    actionContainer: {
     width: width-rs(80),
     flexDirection:'row',
     justifyContent: 'space-between',
    },
    historyDetailsContainer:{
        marginVertical: rs(20),
        borderTopWidth: 1,
        borderColor: colors.borderPrimary ,
        width: width,
        alignItems: 'center',
    },
    historyDetailsTop:{
      marginTop: rs(20),
      width: width-rs(80),
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    textAlignment:{
      textAlign: 'right',
      fontFamily: "Gilroy-Regular",
      color: colors.textSecondary
    },
    generatedVariantContainer: {
      marginTop: rs(20),
      width: width-rs(80),
    },
    singleVariant:{
      backgroundColor: 'red',
      marginVertical: rs(10),
      padding: rs(12),
      borderRadius: rs(12),
      backgroundColor: colors.bgNonary,
      fontFamily: "Gilroy-Regular",
      fontSize: rs(14),
      color: colors.textSecondary
    },
    activeTextColor:{
      fontFamily: "Gilroy-Regular",
      color: colors.textSecondary
    },
    scrollView:{
      marginBottom: rs(50)
    },
    richBar:{
        position: "absolute", 
        bottom: 0, 
        flex: 1 ,
        width: width 
    },
    actionIconContainer:{
      backgroundColor: colors.emptyBg,
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems: 'center',

    },
    actionIcon:{
      marginRight: rs(10),
      padding: rs(8),
    },
    contentInfo:{
     color: colors.textSecondary,
     padding: rs(10)
    }

  });
};
