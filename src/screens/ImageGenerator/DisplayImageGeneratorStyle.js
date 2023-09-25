import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../utils/styles/responsiveSize"
const {width}=Dimensions.get('screen');

export const displayTextGeneratorStyle =(colors)=>{
   return StyleSheet.create({
        pageVisibility: {
          flex: 1,
          backgroundColor: colors.bgSecondary,
        },
       textContainer:{
          alignItems: 'center',
          marginBottom: rs(20),
          marginTop: rs(20)
       },
       imgTitle:{
         fontSize: rs(16),
         color: colors.textQuaternary,
         marginBottom: rs(5),
         fontFamily: 'Gilroy-Semibold',
       },
       imgDescription:{
         textAlign: 'center',
         color: colors.textSecondary
       },
       imgContainer:{
         alignItems: 'center',
         marginTop: rs(15)
       },
       img:{ 
        height: 200, 
        width: width-rs(120) ,
         marginBottom:20
        },
        textAlignment:{
          textAlign: 'center',
        },
        mr_9:{
          marginBottom: rs(9),
        }
       
    })
}