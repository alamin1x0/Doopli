import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../../utils/styles/responsiveSize"

export const codeHistoryDisplayStyle=(colors)=>{
  return StyleSheet.create({
     codePromtContainer:{
        marginBottom: rs(10)
       },
     codeAttribute:{
        marginTop: rs(20),
        flexDirection:'row',
        flexWrap:'wrap',
       },
    })
}