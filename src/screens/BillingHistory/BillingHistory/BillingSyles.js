import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";
const {width}= Dimensions.get('screen');
export const BillingSyles=colors=>{
    return StyleSheet.create({
        onKeyboard: {
            flex: 1
        },
        scroll_view: {
          flex: 1,
          backgroundColor: colors.pageBg,
        },
        container:{
            backgroundColor: colors.bottomTabBg,
            marginHorizontal: rs(20),
            marginVertical: rs(10),
            paddingVertical: rs(14),
            paddingHorizontal: rs(16),
            borderRadius: rs(8),
        },
        title:{
            color: colors.bottomSheetItem,
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(13),
            lineHeight: rs(16),
        },
        subTitle:{
            color: '#898989',
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(13),
            lineHeight: rs(20),
            marginTop: rs(6),
            textAlign: 'left',
        },
        heading_1:{
            color: colors.bottomSheetItem,
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(16),
            lineHeight: rs(22),
        },
        heading_2:{
            color: colors.bottomSheetItem,
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(13),
            lineHeight: rs(16),
        },
        flexContain:{
            flexDirection:'row', 
            justifyContent:'space-between',
            alignItems: 'center'  
        },
        flexView:{
            flexDirection:'row', 
            justifyContent:'space-between',
        },
        pb_20:{
            paddingBottom: rs(20),
        },
        mt_20:{
            marginTop: rs(20),
        },
        payTextColor:{
            color: colors.ifTertiaryVariant,
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(13),
            lineHeight: rs(16),
        },
        downloadIcon:{
            marginRight: rs(6),
        },
        expiredText:{
            color: '#898989',
        },
        mv_7:{
            marginVertical: rs(7)
        }
    })
}