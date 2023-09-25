import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";
const {width}= Dimensions.get('screen');

export const billingDetailsStyle=(colors)=>{
     return StyleSheet.create({
        pageContainer:{
            marginVertical: 20
        },
        BillingProfileContainer:{
            marginHorizontal: rs(20), 
            marginBottom: rs(20),
            backgroundColor: colors.bottomTabBg,
            paddingHorizontal: rs(14),
            paddingVertical: rs(20),
            borderRadius: 8
        },
        sepSectionAlignment: {
            marginTop: rs(24)
        },
        SubcriptionPlan:{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: rs(16)
        },
        singlePlan:{
            width: width/2 - rs(40),
        },
        totalContainer:{ 
           marginTop: rs(16)
        },
        align_start:{
            alignItems: 'flex-start',
        },
        subGrandTotalSection:{
            borderTopWidth: 1,
            borderColor: colors.borderSecondaryVariant,
            paddingTop: rs(16),
        },
        title:{
            color: colors.bottomSheetItem, 
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(20),
            lineHeight: rs(28)
        },
        lightText:{
            color: "#898989", 
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(12),
            lineHeight: rs(16)
        },
        darkText:{
            color: colors.bottomSheetItem, 
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(16),
            lineHeight: rs(24)
        },
        mt_4:{
           marginTop: rs(4)
        },
        total_price_text:{
            color: colors.ifTertiaryVariant
        }
 
     })
}