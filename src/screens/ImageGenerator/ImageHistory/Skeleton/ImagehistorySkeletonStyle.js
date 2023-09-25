import { Dimensions, StyleSheet } from "react-native";
import { rs } from "../../../../utils/styles/responsiveSize";
const {width} = Dimensions.get('screen');
export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent:'space-between',
        width: width - rs(60),
        marginTop: rs(10)
    },
    skeletonWrapperStyle1: {
        height: width/2-rs(40),
        width: width/2-rs(40),
        borderRadius: 6
    },
    skeletonWrapperStyle2: {
        height: width/2-rs(40),
        width: width/2-rs(40),
        borderRadius: 6
    },
});