import { StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize"

export const accountCardStyle=(colors)=>{
    return StyleSheet.create({
        container:{
            backgroundColor: colors.bottomTabBg,
            borderRadius: 8,
            paddingHorizontal: rs(16),
            paddingVertical: rs(22),
        },
        iconTitleContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardIconContainer:{
            flexDirection: 'row',
            alignItems: 'center',
        },
        title:{
            marginHorizontal: rs(10),
            fontFamily: 'Gilroy-Medium',
            color: colors.bottomSheetItem,
            fontSize: rs(15),
            lineheight: rs(20),
        },
        existText:{
            fontFamily: 'Gilroy-Medium',
            color: colors.ifSecondaryVariant,
            fontSize: rs(12),
            lineheight: rs(16),
            marginTop: rs(3)
        }
    })
}