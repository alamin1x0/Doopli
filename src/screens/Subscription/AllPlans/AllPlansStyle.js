import { StyleSheet } from "react-native"

export const allPlansStyle=(colors)=>{
return StyleSheet.create({
    emptyPageAlignment:{
        alignItems: 'center',
    },
    gradientContainer:{
        flexDirection:'row', 
        alignItems:'flex-end', 
        marginTop: 12
    }
})
}