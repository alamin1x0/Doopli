import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";
const {width}= Dimensions.get('screen');
export const emptySubscriptionStyle=colors=>{
    return StyleSheet.create({
        container:{
            backgroundColor: colors.bottomTabBg,
            marginHorizontal: rs(20),
            marginTop: rs(20),
            alignItems: 'center',
            paddingVertical: rs(20),
            borderRadius: 8,

        },
        title:{
          color: colors.bottomSheetItem,
          fontFamily: 'Gilroy-Semibold',
          fontSize: rs(18),
          lineHeight: rs(24)
        },
        subTitle:{
            color: '#898989',
            width: width- rs(120),
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(12),
            lineHeight: rs(17)
        },
        text_center:{
            textAlign: 'center'
        },
        br_8:{
            borderRadius: 8
        },
        seePlanBtn:{
            width: width - rs(80),
        },
        emptyImgContainer:{
            marginVertical: rs(32)
        },
        emptyImg:{
            height: rs(190),
            width: rs(161)
        }
    })
}