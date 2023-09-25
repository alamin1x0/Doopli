import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize"
const {width} = Dimensions.get('screen');

export const currentPlanStyle= colors=>{
    return StyleSheet.create({
        container:{
            backgroundColor: colors.bottomTabBg,
            marginHorizontal: rs(20),
            marginTop: rs(20),
            alignItems: 'center',
            paddingVertical: rs(20),
            borderRadius: 8,
            marginBottom: rs(20),
        },
        price:{
            fontSize: rs(44),
            fontFamily: 'Gilroy-Semibold'
        },
        featuresContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: rs(20),
        },
        featureTitle:{
            marginLeft: rs(10),
            fontFamily: 'Gilroy-Medium',
            color: colors.bottomSheetItem,
            fontSize: rs(13),
            lineHeight: rs(16)
        },
        planName:{
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(22),
            lineHeight: rs(24),
            color: colors.bottomSheetItem,
        },
        renewPaymentBtn:{
           width: width - rs(80),
           marginTop: rs(28)
        },
        br_8:{
           borderRadius: 8
        },
        billingCycle:{
            fontFamily: 'Gilroy-Regular',
            color: colors.textSecondary
        },
        gradientContainer:{
            flexDirection:'row', 
            alignItems:'flex-end', 
            marginTop: 12
        }
    })
}