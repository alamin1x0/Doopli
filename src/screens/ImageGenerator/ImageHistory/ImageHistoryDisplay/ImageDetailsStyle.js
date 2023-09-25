import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../../utils/styles/responsiveSize";
const {width}=Dimensions.get('screen');

export const imageDetailsStyle =(colors)=>{
   return StyleSheet.create({
    pageVisibility:{
        flex: 1,
        backgroundColor: colors.pageBg
    },
    container:{
        borderWidth: 1,
        borderColor: colors.borderSecondary,
        borderRadius: rs(8),
        margin: rs(20),
        backgroundColor: colors.bgSecondary,
        paddingBottom: rs(20),
       },
       imgContainer:{
        alignItems: 'center',
        marginTop: rs(20),
      },
      img:{ 
       height: 250, 
       width: width-rs(80) ,
       marginBottom:20,
       borderRadius: rs(8)
       },
       imgPromtContainer:{
        marginHorizontal: rs(20),
        marginBottom: rs(10)
       },
       imgPromtText:{
        fontFamily:'Gilroy-Regular',
        color: colors.textSecondary,
       },
       promtDescription:{
        color: colors.textSecondary,
        fontFamily:'Gilroy-Regular',
       },
       imgAttribute:{
        marginHorizontal: rs(20),
        marginTop: rs(20),
        flexDirection:'row',
        flexWrap:'wrap',
       },
       singleAttribute:{
        backgroundColor: colors.bgNonary,
        width: width/2 - rs(48),
        paddingHorizontal: rs(10),
        paddingVertical: rs(15),
        marginBottom: rs(20),
        borderRadius: rs(8)
       },
       mr_right:{
        marginRight: rs(13)
       },
       attributeTitle:{
        fontFamily: "Gilroy-Regular",
        color: colors.textSecondary,
       },
       attributeValue:{
        fontFamily: 'Gilroy-Semibold',
        color: colors.textSecondary,
        marginTop: rs(10)
       },
       shareText:{
        fontFamily: "Gilroy-Semibold",
        color: colors.textSecondary,
        marginRight: rs(5)
       },
       socialShareSection:{
         marginHorizontal: rs(20),
         borderWidth: 1,
         borderColor: colors.borderPrimaryVariant,
         borderRadius: rs(8),
         padding: rs(15),
         flexDirection:'row',
         alignItems: 'center',
       },
       singleSocialIcon:{
        marginHorizontal: rs(7)
       },
       downloadImageSection:{
        margin: rs(20)
    
       }
    })
}