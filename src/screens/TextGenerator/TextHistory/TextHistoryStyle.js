import { Dimensions, StyleSheet } from "react-native"
import { rs } from "../../../utils/styles/responsiveSize"
const {width}=Dimensions.get('screen')
export const textHistoryStyle=(colors)=>{
  return StyleSheet.create({
        pageVisibility:{
            flex: 1,
            alignItems:'center',
            backgroundColor: colors.pageBg
        },
        specificContain:{
           backgroundColor: colors.bgQuinaryVariant,
           marginVertical: rs(8),
           padding: rs(16),
           borderRadius: 8,
           width: width - rs(40)    
        },
        textHistoryContainer:{
            width: width- rs(40),
            paddingVertical: rs(8),
        },
        subInfo:{
         flexDirection: 'row',
         justifyContent: 'space-between'
        },
       timeWordContainer:{
        flexDirection:'row'
       },
       slugContainer:{
        paddingRight: rs(30)
       },
       slug:{
        color: colors.textSecondary,
        fontFamily: 'Gilroy-Semibold',
        fontSize: rs(13),
        lineHeight: rs(20),
        marginTop: rs(6)
       },
       actionIcon:{
        width: rs(25),
        height: rs(25),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: rs(-5)
       },
       timeText:{
        marginRight: rs(10),
        fontFamily: 'Gilroy-Medium',
        fontSize: rs(11),
        color: colors.textTertiary
       },
       loaderCont: {
        marginTop: rs(26),     
        marginBottom: rs(-10),
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row'
      },
      EmptyDataContainer:{
        backgroundColor: colors.emptyBg,
        paddingHorizontal: 20, 
        paddingVertical: 37,
        alignItems:'center', 
        marginTop: 20,
        borderRadius: 8,
        width: width -rs(60)
      },
      emptyText:{
        color: "#898989",
        fontFamily: "Gilroy-bold",
        fontSize: rs(15),
        lineHeight: rs(22),
        textAlign: 'center',
      },
      align_center:{
        alignItems: 'center',
      }
    })
}