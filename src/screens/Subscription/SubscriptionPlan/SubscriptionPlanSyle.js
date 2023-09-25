import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";
const {width}= Dimensions.get('screen');
export const SubscriptionPlanSyle=colors=>{
    return StyleSheet.create({
        container:{
            backgroundColor: colors.bottomTabBg,
            marginHorizontal: rs(20),
            marginTop: rs(20),
            padding: rs(14),
            borderRadius: rs(8),

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
            lineHeight: rs(17),
            marginTop: rs(6),
        },
        heading_1:{
            color: colors.bottomSheetItem,
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(16),
            lineHeight: rs(24),
            marginTop: rs(4),
        },
        heading_2:{
            color: '#898989',
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(12),
            lineHeight: rs(16),
        },
        heading_3:{
            color: '#FFF',
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(12),
            lineHeight: rs(17),
        },heading_4:{
            color: '#DFDFDF',
            fontFamily: 'Gilroy-Medium',
            fontSize: rs(14),
            lineHeight: rs(18),
        },
        subStatus:{
            fontFamily: 'Gilroy-Semibold',
            fontSize: rs(22),
            lineHeight: rs(24),
            marginTop: rs(8)
        },
        bg_29:{
            backgroundColor: '#292929'
        },
        text_center:{
            textAlign: 'center'
        },
        br_8:{
            borderRadius: rs(8),
        },
        borderContain:{
            backgroundColor: colors.bottomTabBg,
            borderWidth:1, 
            borderColor: '#898989',
            borderRadius: rs(8)
        }
        ,flexContain:{
            flexDirection: 'row',
            flexWrap: 'wrap',  
        }
        ,Subs_contain:{
            flexDirection:'row', 
            justifyContent:'space-between',
            alignItems: 'center'  
        },
        flexView:{
            width: '50%',
        },
        pb_16:{
            paddingBottom: rs(16),
        },
        pb_20:{
            paddingBottom: rs(20),
        },
        mt_20:{
            marginTop: rs(20),
        },
        mt_24:{
            marginTop: rs(24),
        }
    })
}