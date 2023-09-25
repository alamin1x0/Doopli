import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";

export const statusSyles=(colors,status)=>{
    return StyleSheet.create({
        paddingHorizontal: rs(10),
        paddingVertical: rs(4),
        borderRadius: rs(40),
        color: status=='Inactive'? '#474746' : '#FFFFFF',
        backgroundColor: status=='Active'? '#48B460': status=='Inactive'? '#DFDFDF' : status=='Failed'? '#DF2F2F' : status == 'Pending'? '#763CD4' : '#898989',
        fontFamily: 'Gilroy-Semibold',
        fontSize: rs(11),
        lineHeight: rs(16),
    })
}