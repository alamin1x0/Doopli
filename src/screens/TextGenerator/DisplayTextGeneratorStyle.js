import { Dimensions, StyleSheet } from "react-native";
import { rs } from "../../utils/styles/responsiveSize";
const {width}=Dimensions.get('screen');

export const displayTextGeneratorStyle = (colors) => {
    return StyleSheet.create({
     scrollView:{
          backgroundColor: colors.emptyBg
     },
     richBar:{
          position: "absolute", 
          bottom: 0, 
          flex: 1 ,
          width: width 
     },
     richEditor:{
          backgroundColor: colors.emptyBg,
          color: colors.textSecondary
     }
  
    });
  };