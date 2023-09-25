import { Dimensions, StyleSheet } from "react-native";
import { rs } from "../../../../utils/styles/responsiveSize";
const {width} = Dimensions.get('screen');
export const textHistorySkeletonStyle=(colors)=> StyleSheet.create({
    container: {
        justifyContent:'space-between',
        width: width - rs(40),
        borderWidth: 1, 
        borderColor: colors.borderSecondary, 
        borderRadius: 6,
        padding: rs(16),
        marginVertical: rs(8),
        backgroundColor: colors.bgQuinaryVariant,
    },
    timeDateContainer:{
        flexDirection:'row'
    },
    skeletonWrapperStyle1: {
        height: rs(7),
        width: width/2-rs(140),
        borderRadius: 6,
        marginRight: rs(10),
    },
    skeletonWrapperStyle2: {
        height: rs(8),
        width: width-rs(80),
        borderRadius: 6
    },
    skeletonWrapperStyle3: {
        height: rs(8),
        width: width/2-rs(80),
        borderRadius: 6
    },
    
});