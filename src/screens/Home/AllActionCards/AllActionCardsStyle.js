import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize";
const {width}=Dimensions.get('screen');
export const allActionsCardStyle=(colors)=>{
    return StyleSheet.create({
        balanceCard:{
            width: width/2 - rs(26),
        }
    })
}